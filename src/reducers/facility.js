import { SET_FACILITY, RESET_FACILITY } from "../actions/facility";

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
      };

    default:
      return state;
  }
};

export default user;
