const apiErrorCodes = {
    ERROR_QUEUE_EXCEED: "queue.exceed",
    ERROR_VISION_RESPONSE: "error.vision.response",
    ERROR_INTERNAL: "error.internal"
};

const popupTypes = {
    POP_SAVE_SUCCESS: "pop_save_success",
    POP_CHECK_NETWORK: "pop_check_network",
    POP_MISSING_FACE: "pop_missing_face",
    POP_UNSUPPORTED_TYPE: "pop_unsupported_type",
    POP_TOO_MANY_USER: "pop_too_many_user",
    POP_EXPIRED_PAGE: "pop_expired_page",
    POP_SELECT_PICTURE: "pop_select_picture",

    ofErrorCode(errorCode, visionErrorCode) {
        if(errorCode === apiErrorCodes.ERROR_QUEUE_EXCEED) {
            return this.POP_TOO_MANY_USER;
        } else if(errorCode === apiErrorCodes.ERROR_VISION_RESPONSE) {
            //vision error code 4xx가 인식 실패임.
            if(!visionErrorCode || visionErrorCode.charAt(0) !== '4') {
                return this.POP_TOO_MANY_USER;
            } else {
                return this.POP_MISSING_FACE;
            }
        } else if(errorCode === apiErrorCodes.ERROR_INTERNAL) {
            return this.POP_TOO_MANY_USER;
        }
    }
};

export default popupTypes;
