import { USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, CLEAR_DATA } from "../constants"

const initialState = {
    users: [],
    feed: [],
    usersFollowingLoaded: 0
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}