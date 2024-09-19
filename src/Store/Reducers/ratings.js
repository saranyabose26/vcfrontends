
const feedBacks = [];

function ratings(state = feedBacks, action) {
    if (action.type === "AddRatingData") {
        return [...action.data];
    } else if (action.type === "AddFeedBackRatingData") {
        return [...state, action.data]
    } else {
        return [...state];
    }

}

export default ratings;
