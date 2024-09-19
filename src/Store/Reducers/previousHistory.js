const userPreviousVehicleHistory = [];

function previousHistory(state = userPreviousVehicleHistory, action) {
    if (action.type === "AddPreviousHistoryData") {
        return [...state, ...action.data]
    } else {
        return state;
    }
}

export default previousHistory