//user roles
module.exports.ROLE_SUPER_ADMIN = "5e2fd51f34ce7375a792ffc0";
module.exports.ROLE_ADMIN = "5e2fd51f34ce7375a792ffc1";
module.exports.ROLE_MODERATOR = "5e2fd51f34ce7375a792ffc2";
module.exports.ROLE_CONTRIBUTOR = "5e2fd51f34ce7375a792ffc3";
module.exports.ROLE_USER = "5e2fd51f34ce7375a792ffc4";
module.exports.ROLE_GUEST = "5e2fd51f34ce7375a792ffc5";
module.exports.ROLE_STAFF = "60e29aa226a6922071e17b7b";

module.exports.DEACTIVATED_ACCOUNT_SUCCESSFULLY = `Account is deactivated successfully.`;
//default communites array
module.exports.DEFAULT_COMMUNITES = [
    "5ea40c6025046d25d4a9fbf4",
    "5ea40dd025046d25d4a9fbf5",
    "5ea40e483d019d2870d8c3cc",
];

/* HTTP status code constant starts */
//1XX INFORMATIONAL
module.exports.SERVER_CONTINUE_HTTP_CODE = 100;
module.exports.SERVER_SWITCHING_PROTOCOLS_HTTP_CODE = 101;
module.exports.SERVER_PROCESSING_HTTP_CODE = 102;

//2XX SUCCESS
module.exports.SERVER_OK_HTTP_CODE = 200;
module.exports.SERVER_CREATED_HTTP_CODE = 201;
module.exports.SERVER_ACCEPTED_HTTP_CODE = 202;
module.exports.SERVER_NON_AUTHORITATIVE_INFORMATION_HTTP_CODE = 203;
// module.exports.SERVER_NO_CONTENT_HTTP_CODE = 204;
module.exports.SERVER_NO_CONTENT_HTTP_CODE = 404;
module.exports.SERVER_RESET_CONTENT_HTTP_CODE = 205;
module.exports.SERVER_PARTIAL_CONTENT_HTTP_CODE = 206;
module.exports.SERVER_MULTI_STATUS_HTTP_CODE = 207;
module.exports.SERVER_ALREADY_REPORTED_HTTP_CODE = 208;
module.exports.SERVER_IM_USED_HTTP_CODE = 226;
//3XX REDIRECTIONAL
module.exports.SERVER_MULTIPLE_CHOICES_HTTP_CODE = 300;
module.exports.SERVER_MOVED_PERMANENTLY_HTTP_CODE = 301;
module.exports.SERVER_FOUND_HTTP_CODE = 302;
module.exports.SERVER_SEE_OTHER_HTTP_CODE = 303;
module.exports.SERVER_NOT_MODIFIED_HTTP_CODE = 303;
module.exports.SERVER_USE_PROXY_HTTP_CODE = 305;
module.exports.SERVER_TEMPORARY_REDIRECT_HTTP_CODE = 307;
module.exports.SERVER_PERMANENT_REDIRECT_HTTP_CODE = 308;
//4XX CLIENT ERROR
module.exports.SERVER_BAD_REQUEST_HTTP_CODE = 400;
module.exports.SERVER_UNAUTHORIZED_HTTP_CODE = 401;
module.exports.SERVER_PAYMENT_REQUIRED_HTTP_CODE = 402;
module.exports.SERVER_FORBIDDEN_HTTP_CODE = 403;
module.exports.SERVER_NOT_FOUND_HTTP_CODE = 404;
module.exports.SERVER_METHOD_NOT_ALLOWED_HTTP_CODE = 405;
module.exports.SERVER_NOT_ACCEPTABLE_HTTP_CODE = 406;
module.exports.SERVER_PROXY_AUTHENTICATION_REQUIRED_HTTP_CODE = 407;
module.exports.SERVER_REQUEST_TIME_OUT_HTTP_CODE = 408;
module.exports.SERVER_CONFLICT_HTTP_CODE = 409;
module.exports.SERVER_GONE_HTTP_CODE = 410;
module.exports.SERVER_LENGTH_REQUIRED_HTTP_CODE = 411;
module.exports.SERVER_PRECONDITION_FAILED_HTTP_CODE = 412;
module.exports.SERVER_PAYLOAD_TOO_LARGE_HTTP_CODE = 413;
module.exports.SERVER_REQUEST_URL__TOO_LARGE_HTTP_CODE = 414;
module.exports.SERVER_UNSUPPORTED_MEDIA_TYPE_HTTP_CODE = 415;
module.exports.SERVER_REQUESTED_RANGE_NOT_SATISFIABLE_HTTP_CODE = 416;
module.exports.SERVER_EXPECTATION_FAILED_HTTP_CODE = 417;
module.exports.SERVER_IAM_A_TEAPORT_HTTP_CODE = 418;
module.exports.SERVER_MISDIRECTED_REQUEST_HTTP_CODE = 421;
module.exports.SERVER_UNPROCESSABLE_ENTITY_HTTP_CODE = 422;
module.exports.SERVER_LOCKED_HTTP_CODE = 423;
module.exports.SERVER_FAILED_DEPENDENCY_HTTP_CODE = 424;
module.exports.SERVER_UPGRADE_REQUIRED_HTTP_CODE = 426;
module.exports.SERVER_PRECONDITION_REQUIRED_HTTP_CODE = 428;
module.exports.SERVER_TO_MANY_REQUESTS_HTTP_CODE = 429;
module.exports.SERVER_REQUEST_HEADER_FIELDS_TOO_LAEGE_HTTP_CODE = 431;
module.exports.SERVER_CONNECTION_CLOSED_WITHOUT_RESPONSE_HTTP_CODE = 444;
module.exports.SERVER_UNAVAILABLE_FOR_LEGAL_REASONS_HTTP_CODE = 451;
module.exports.SERVER_CLIENT_CLOSE_REQUEST_HTTP_CODE = 499;
//5XX SERVER ERROR
module.exports.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE = 500;
module.exports.SERVER_NOT_IMPLEMENTED_HTTP_CODE = 501;
module.exports.SERVER_BAD_GATEWAY_HTTP_CODE = 502;
module.exports.SERVER_NOT_ALLOWED_HTTP_CODE = 503;
module.exports.SERVER_GATEWAY_TIMEOUT_HTTP_CODE = 504;
module.exports.SERVER_HTTP_VERSION_NOT_SUPPORTED_HTTP_CODE = 505;
module.exports.SERVER_VARIANT_ALSO_NEGOTIATES_HTTP_CODE = 506;
module.exports.SERVER_INSUFFICIENT_STORAGE_HTTP_CODE = 507;
module.exports.SERVER_LOOP_DETECTED_HTTP_CODE = 508;
module.exports.SERVER_NOT_EXTENDED_HTTP_CODE = 510;
module.exports.SERVER_NETWORK_AUTHENTICATION_REQUIRED_HTTP_CODE = 511;
module.exports.SERVER_NETWORK_CONNECT_TIMEOUT_ERROR_HTTP_CODE = 599;
/* HTTP status codeconstant ends */
//HTTP TEXUAL MESSAGE
//1XX INFORMATIONAL
module.exports.CONTINUE = "CONTINUE";
module.exports.SWITCHING_PROTOCOLS = "Switching Protocols";
module.exports.PROCESSING = "Processing";
//2XX SUCCESS
module.exports.OK = "Ok";
module.exports.CREATED = "Created";
module.exports.ACCEPTED = "Accepted";
module.exports.NON_AUTHORITATIVE_INFORMATION = "Non authoritative information";
module.exports.NO_CONTENT = "No content";
module.exports.RESET_CONTENT = "reset content";
module.exports.PARTIAL_CONTENT = "Partial content";
module.exports.MULTI_STATUS = "Multi status";
module.exports.ALREADY_REPORTED = "Already reported";
module.exports.IM_USED = "Im used";
//3XX REDIRECTIONAL
module.exports.MULTIPLE_CHOICES = "Multiple choices";
module.exports.MOVED_PERMANENTLY = "Moved permanently";
module.exports.FOUND = "Found";
module.exports.SEE_OTHER = "See Other";
module.exports.NOT_MODIFIED = "Not modified";
module.exports.USE_PROXY = "Use proxy";
module.exports.TEMPORARY_REDIRECT = "Tempory redirect";
module.exports.PERMANENT_REDIRECT = "Permanent redirect";
//4XX CLIENT ERROR
module.exports.BAD_REQUEST = "Bad request";
module.exports.UNAUTHORIZED = "Unauthorized";
module.exports.PAYMENT_REQUIRED = "Payment required";
module.exports.FORBIDDEN = "Forbidden";
module.exports.NOT_FOUND = "Not Found";
module.exports.METHOD_NOT_ALLOWED = "Method not allowed";
module.exports.NOT_ACCEPTABLE = "Not acceptable";
module.exports.PROXY_AUTHENTICATION_REQUIRED = "Proxy authentication required";
module.exports.REQUEST_TIME_OUT = "Request time out";
module.exports.CONFLICT = "Conflict";
module.exports.GONE = "Gone";
module.exports.LENGTH_REQUIRED = "Length required";
module.exports.PRECONDITION_FAILED = "Precondition failed";
module.exports.PAYLOAD_TOO_LARGE = "Payload to large";
module.exports.REQUEST_URL__TOO_LARGE = "Request url to large";
module.exports.UNSUPPORTED_MEDIA_TYPE = "Unsupported media";
module.exports.REQUESTED_RANGE_NOT_SATISFIABLE =
    "Request range not satisfiable";
module.exports.EXPECTATION_FAILED = "Expectation failed";
module.exports.IAM_A_TEAPORT = "Iam a teaport";
module.exports.MISDIRECTED_REQUEST = "Misdirected request";
module.exports.UNPROCESSABLE_ENTITY = "Unprocessable entity";
module.exports.LOCKED = "Locked";
module.exports.FAILED_DEPENDENCY = "Failed dependency";
module.exports.UPGRADE_REQUIRED = "Upgrade required";
module.exports.PRECONDITION_REQUIRED = "Precondition required";
module.exports.TO_MANY_REQUESTS = "To many redu=irect";
module.exports.REQUEST_HEADER_FIELDS_TOO_LAEGE =
    "Request header fields to large";
module.exports.CONNECTION_CLOSED_WITHOUT_RESPONSE =
    "Connection closed without response";
module.exports.UNAVAILABLE_FOR_LEGAL_REASONS = "Unavailable for legal reasons";
module.exports.CLIENT_CLOSE_REQUEST = "Client close request";
//5XX SERVER ERROR
module.exports.INTERNAL_ERROR = "Internal error";
module.exports.NOT_IMPLEMENTED = "Not implemented";
module.exports.BAD_GATEWAY = "Bad request";
module.exports.NOT_ALLOWED = "Not allowed";
module.exports.GATEWAY_TIMEOUT = "Gateway timeout";
module.exports.HTTP_VERSION_NOT_SUPPORTED = "Http version not supported";
module.exports.VARIANT_ALSO_NEGOTIATES = "Variant also negotiates";
module.exports.INSUFFICIENT_STORAGE = "Insufficent storage";
module.exports.LOOP_DETECTED = "Loop detected";
module.exports.NOT_EXTENDED = "Not Extended";
module.exports.NETWORK_AUTHENTICATION_REQUIRED =
    "Network authentication required";
module.exports.NETWORK_CONNECT_TIMEOUT_ERROR = "Network connection timeout";
//HTTP TEXUAL MESSAGE ENDS

/* Validation related  constants starts*/
module.exports.JOI_VALIDATION_ERROR = `Validation Error Occur`;
module.exports.INVALID_USER_ID = `Invalid User Id`;
module.exports.INVALID_ID = `Invalid ID`;
module.exports.ACCEPTED_IMAGES_FORMAT = `only These Types of images accepted here( jpeg|png|jpg )`;

/* Validation related  constants ends*/

/* General Errors  constants start */
module.exports.ROUTE_NOT_FOUND = `You are at wrong place. Shhoooo...`;
module.exports.SERVER_ERROR_MESSAGE = `Something bad happend. It's not you, it's me.`;
module.exports.USERNAME_NOT_EMPTY = `UserName is required.`;
module.exports.EMAIL_NOT_EMPTY = `User Id can't be empty.`;

/* Route related constants starts*/
module.exports.USERNAME_AVAILABLE_FAILED = `Username is unavailable.`;
module.exports.USERNAME_AVAILABLE_OK = `Username is available.`;
module.exports.USER_REGISTRATION_OK = `User registration successful.`;
module.exports.USER_REGISTRATION_FAILED = `User registration unsuccessful.`;
module.exports.USER_LOGIN_OK = `User logged in.`;
module.exports.USER_LOGIN_FAILED = `User not found.`;
module.exports.TOKEN_IS_INVALID = `Invalid token`;
module.exports.TOKEN_IS_VALID = `Token is valid`;
module.exports.TOKEN_IS_REQUIRED = `Access denied. No token provided.`;
module.exports.USER_IS_NOT_DEFINED = `Token is invalid`;
module.exports.HASH_IS_NOT_VALID = `Hash is not valid.`;
module.exports.PASSWORD_NOT_MATCHED = `Password is wrong.`;
module.exports.PASSWORD_RESET_SUCCESSFULLY = `Password reset successfully.`;

module.exports.EMAIL_NOT_EXIST = `Email is not exits.`;
module.exports.EMAIL_IS_NOT_VERIFIED = `Please verify your email address first`;
module.exports.EMAIL_EXIST = `An account under that email already exists.`;
module.exports.USERID_NOT_FOUND = `User Id can't be empty.`;
module.exports.USER_NOT_FOUND = `User does not exits.`;
module.exports.USER_FOUND = `User found.`;
module.exports.USER_UPDATE_SUCCESSFULLY = `User data is updated successfully.`;
module.exports.OLD_PASSWORD_WRONG = `Your old password is wrong.`;
module.exports.PASSWORD_CHANGED = `Password change successfully.`;
module.exports.IMAGE_CHANGED = `Image change successfully.`;
module.exports.CODE_EXPIRED = `Code is expired.`;
module.exports.ACTIVATED = `Account is Actived.`;

/* Route related constants ends*/

//user related responses
module.exports.USER_LIST = `List of all users`;

//forget password
module.exports.EMAIL_SEND = `Email Send Successfully.`;
module.exports.EMAIL_ALREADY_VERIFIED = `Email already Verified.`;

//generic related response
module.exports.ADD_SUCCESSFULLY = `Added successfully`;
module.exports.UPDATED_SUCCESSFULLY = `Updated successfully`;
module.exports.NAME_NOT_EMPTY = `Name cannot be empty`;
module.exports.ALREADY_EXIST = `Data with this name already exist`;
module.exports.NOT_EXIST = `Data not exist`;
module.exports.DELETED_SUCCESSFULLY = `Deleted successfully`;
module.exports.ID_IS_REQUIRED = `ID is required`;
module.exports.SLUG_IS_REQUIRED = `Slug is required`;
module.exports.KEYWORD_IS_REQUIRED = `Keyword is required`;
module.exports.USER_SEARCH_RESULT = `User List`;
//post related messages
module.exports.LIKEDED = "UpVote Successfully";
module.exports.REMOVE_LIKEDED = "remove UpVote Successfully";
module.exports.DIS_LIKEDED = "DownVote Successfully";
module.exports.REMOVE_DIS_LIKEDED = "removed DownVote Successfully";
module.exports.INVALID_POST_AUTHOR = "Invalid Post author";
module.exports.INVALID_POST_ID = "Invalid Post ID";
module.exports.USER_LIST_OF_POSTS = "User List of post";
module.exports.POST_DETAILS = "Post Detail";
module.exports.COMMENTED_POST_LIST = "Commented Post List";

//community related messages
module.exports.LIST_OF_COMMUITY_USERS = "List of community Users";
module.exports.PERSON_IS_NOT_MODERATOR =
    "Person is not moderator of this community.";
module.exports.LIST_OF_COMMUITIES = "List of communities";
module.exports.LIST_OF_COMMUITY_POST = "List of community Post";
module.exports.JOINED_COMMUITY = "Successfully joined community";
module.exports.ALREADY_JOINED_COMMUITY = "Already joined community";
module.exports.LEAVED_COMMUNITY = "Successfully leaved community";
module.exports.ALREADY_LEAVED_COMMUNITY = "Already leaved community";
module.exports.COMMUNITY_NOT_EXIST = "Community does not exist";
module.exports.INVALID_COMMUNITY_ID = "Invalid Community ID";
module.exports.INVITATION_SEND = "Invitation send successfully";
module.exports.INVALID_ADMIN = "You are not have right to do this operation";
module.exports.INVALID_ADMIN_MODERATOR =
    "You are not have right to do this operation.";
module.exports.ALREADY_MODERATOR =
    "This person is already moderator in this community.";
module.exports.ALREADY_INVITE_SEND = "Already Invitation send";
module.exports.INVITE_ACCEPTED = "Invitation accepted";
module.exports.INVITE_REJECTED = "Invitation rejected";
module.exports.INVITE_LIST = "Invitation List";
module.exports.NO_INVITATION_FOUND = "No Invitation found";
module.exports.JOINING_COMMUNITIES_LIST = "List of communities";
module.exports.JOING_REQUEST_SUBMITTED =
    "Your Community Joining Request is submitted and pending for approval by Community Admin.";
module.exports.PENING_JOING_REQUEST_NOT_FOUND =
    "No such Pending Joining request found.";
module.exports.ACCEPTED_JOING_REQUEST = "Accepted Joining request.";
module.exports.REJECTED_JOING_REQUEST = "Rejected Joining request.";
module.exports.PERSON_NOT_JOINED_COMMUNITY =
    "System cannot find that this person joined this community.";
module.exports.USER_DELETED_COMMUNITY_SUCCESSFULLY = `User is successfully removed from community.`;
module.exports.MODERATOR_DELETED_COMMUNITY_SUCCESSFULLY = `Moderator is successfully removed from community.`;

//User News Feed
module.exports.USER_NEWS_FEED = `User News Feed`;

//Saved Post
module.exports.POST_SAVED_SUCCESSFULLY = `Post is saved successfully.`;
module.exports.POST_UNSAVED_SUCCESSFULLY = `Post is unsaved successfully.`;
module.exports.NO_SUCH_POST_TO_UNSAVED_SUCCESSFULLY = `No such post saved to unsaved`;
module.exports.ALREADY_SAVED_SUCCESSFULLY = `already saved.`;

//points system
module.exports.ADMIN_NOTIFICATION_ID = `5ea5bfe037cf27a84f9d8b87`;
//verify email
module.exports.VERIFY_EMAIL_POINT = 20;
module.exports.VERIFY_EMAIL_POINT_TEXT = `For verifying email milestone `;

//profile update
module.exports.UPDATE_PROFILE_FIRST_POINT = 20;
module.exports.UPDATE_PROFILE_FIRST_TEXT = `For completeing your Profile milestone `;
//comunities join points
module.exports.FIRST_THREE_COMMUNITIES_JOINIED_POINT = 20;
module.exports.FIRST_THREE_COMMUNITIES_JOINIED_TEXT = `For Joining 3 communities milestone  `;

//post points
module.exports.FIRST_POST_POINT = 20;
module.exports.FIRST_POST_POINT_TEXT = `For Your First Post  `;
module.exports.CREATE_TEN_POST_POINT = 20;
module.exports.CREATE_TEN_POST_POINT_TEXT = `For Your Ten Post  `;
module.exports.CREATE_TWENTY_FIVE_POST_POINT = 20;
module.exports.CREATE_TWENTY_FIVE_POST_POINT_TEXT = `For Your Twenty Five Post  `;
module.exports.CREATE_FIFTY_POST_POINT = 20;
module.exports.CREATE_FIFTY_POST_POINT_TEXT = `For Your Fifty Post  `;
module.exports.CREATE_HUNDRED_POST_POINT = 20;
module.exports.CREATE_HUNDRED_POST_POINT_TEXT = `For Your Hundred Post  `;

//Notification types
module.exports.IS_AWARD = `isAward`;
module.exports.IS_AWARD_TEXT = ` points added to your cookie points.`;
module.exports.IS_NEW_POST = `isNewPost`;
module.exports.IS_NEW_POST_TEXT = ` created a new post in`;
module.exports.IS_POST_Liked = `isPostLiked`;
module.exports.IS_POST_Liked_TEXT = ` Likes your post.`;
module.exports.IS_POST_DISLiked = `isPostDisLiked`;
module.exports.IS_POST_DISLiked_TEXT = ` DisLikes your post.`;
module.exports.IS_INVITATION = `isInvitation`;
module.exports.IS_INVITATION_TEXT = `You have new invitation to become a community moderator in `;
module.exports.IS_INVITATION_RESPONSE = `isInvitationResponse`;
module.exports.IS_INVITATION_RESPONSE_TEXT = ` for Community Moderator.`;
module.exports.IS_NEW_JOINED_REQUEST = `isNewJoined`;
module.exports.IS_NEW_JOINED_REQUEST_TEXT = ` Joined `;
module.exports.IS_JOINING_PENDING_REQUEST = `isJoinedPending`;
module.exports.EVENT_IS_START_TEXT = `is going to start in `;
module.exports.EVENT_IS_START = `isEventStart`;
module.exports.IS_JOINING_PENDING_REQUEST_TEXT = `Check out New Community Joining Request in `;
module.exports.IS_JOINING_RESPONSE = `isJoiningResponse`;
module.exports.IS_JOINING_RESPONSE_TEXT = `Your Joining Request is `;
module.exports.IS_POST_COMMENT = `isPostComment`;
module.exports.IS_POST_COMMENT_TEXT = ` commented on your post`;
module.exports.EMAIL_BANNED_MSG = "You are banned from this platform";

//page limits
module.exports.USER_PAGE_SIZE = 50;
module.exports.USER_SEARCH_PAGE_SIZE = 50;
module.exports.COMMUNITY_POSTS_PAGE_SIZE = 10;
module.exports.NEWSFEED_PAGE_SIZE = 10;

//Notification
module.exports.NOTIFICATION_LIST = `Notification List`;
module.exports.MARK_READ = `Mark Read`;
module.exports.MARK_READ_ALL = `All mark as read.`;

//  Award
module.exports.AWARD_LIST = "Award list";
module.exports.AWARD_RECEIVED_NOTIFI = "AwardReceived";
