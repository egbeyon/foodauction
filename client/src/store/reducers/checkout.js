import {
  SET_SELECTED_FARM,
  SET_SELECTED_DATE,
  SET_SELECTED_TIME,
  TOGGLE_LOGIN_POPUP,
  SHOW_INVITATION_FORM,
  RESET_CHECKOUT,
  SET_INVITATION,
  SET_QR_CODE
} from '../types';

const initialState = {
  selectedFarm: '',
  selectedDate: null,
  selectedTime: '',
  showLoginPopup: false,
  showInvitation: false,
  invitations: {},
  QRCode: ''
};


const setSelectedFarm = (state, selectedFarm) => ({
  ...state,
  selectedFarm
});

const setSelectedDate = (state, selectedDate) => ({
  ...state,
  selectedDate
});

const setSelectedTime = (state, selectedTime) => ({
  ...state,
  selectedTime
});

const setInvitation = (state, event) => {
  return {
    ...state,
    invitations: {
      ...state.invitations,
      [event.target.name]: event.target.value
    }
  };
};

const setQRCode = (state, QRCode) => ({
  ...state,
  QRCode
});

const toggleLoginPopup = state => ({
  ...state,
  showLoginPopup: !state.showLoginPopup
});
const showInvitationForm = state => ({
  ...state,
  showInvitation: !state.showInvitation
});
const resetCheckout = () => initialState;

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SELECTED_FARM:
      return setSelectedFarm(state, payload);
    case SET_SELECTED_DATE:
      return setSelectedDate(state, payload);
    case SET_SELECTED_TIME:
      return setSelectedTime(state, payload);
    case SET_INVITATION:
      return setInvitation(state, payload);
    case TOGGLE_LOGIN_POPUP:
      return toggleLoginPopup(state);
    case SHOW_INVITATION_FORM:
      return showInvitationForm(state);
    case SET_QR_CODE:
      return setQRCode(state, payload);
    case RESET_CHECKOUT:
      return resetCheckout();
    default:
      return state;
  }
}
