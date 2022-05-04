import {
  SET_FACILITY,
  RESET_FACILITY,
  SET_LOADING_ROOMS,
  SET_ROOMS,
} from "../actions/facility";

const initialState = {
  details: {
    name: "",
    type: "",
    description: "",
    address: "",
    lat: "",
    long: "",
    stars: "",
    averagePrice: "",
    image: "",
  },
  rooms: {
    loading: true,
    allRooms: [],
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_FACILITY:
      const {
        name,
        type,
        description,
        address,
        lat,
        long,
        image,
        stars,
        averagePrice,
      } = action.payload;
      return {
        ...state,
        details: {
          name,
          type,
          description,
          address,
          lat,
          long,
          image,
          stars,
          averagePrice,
        },
      };
    case SET_LOADING_ROOMS:
      return {
        ...state,
        rooms: { ...state.rooms, loading: action.payload },
      };
    case SET_ROOMS:
      return {
        ...state,
        rooms: { ...state.rooms, allRooms: action.payload },
      };

    case RESET_FACILITY:
      return {
        details: {
          name: "",
          type: "",
          description: "",
          address: "",
          lat: "",
          long: "",
          stars: "",
          averagePrice: "",
          image: "",
        },
        rooms: {
          loading: true,
          allRooms: [],
        },
      };

    default:
      return state;
  }
};

export default user;
