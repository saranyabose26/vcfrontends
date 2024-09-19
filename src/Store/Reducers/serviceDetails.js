
const allServiceDetails = [];


function serviceDetailsReducer(state = allServiceDetails, action) {
    if (action.type === "AddServiceDetailsData") {
        return [...action.data];
    } else {
        return state
    }
}

export default serviceDetailsReducer