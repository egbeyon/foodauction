import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class ReservesCalendar extends Component {
  onFindAttr = (id, list, attr) => {
    const item = list.find(item => item._id === id);
    return item ? item[attr] : `Not ${attr} Found`;
  };

  render() {
    const { reserves, farms, products } = this.props;

    const events = reserves.map(reserve => ({
      title: `Product: ${this.onFindAttr(
        reserve.productId,
        products,
        'title'
      )}-Farm: ${this.onFindAttr(reserve.farmId, farms, 'name')}`,
      start: reserve.date,
      // startTime: reserve.startAt,
      // end: reserve.date,
      url: `/product/${reserve.productId}`
    }));

    return (
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
      />
    );
  }
}

export default ReservesCalendar;
