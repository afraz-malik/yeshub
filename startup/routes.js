const express = require("express");
const cors = require("cors");
//middlewares
const auth = require("../middleware/auth");
const checkUser = require("../middleware/checkuser");
const checkAdmin = require("../middleware/checkAdmin");
const validateCommunityAuthor = require("../middleware/community/validateCommunityAuthor");
const checkCommunityExist = require("../middleware/community/checkCommunityExist");
const checkAlreadyInvite = require("../middleware/community/checkInvite");
const checkInvitation = require("../middleware/community/checkInvitation");

//user related routes
const User = require("../routes/modules/user/user");
const UserProfile = require("../routes/modules/user/completeProfile/completeProfile");

const Post = require("../routes/modules/user/post/post");
const SavedPost = require("../routes/modules/user/post/saved/saved");
//like and unlike post route
const PostLikeUnlike = require("../routes/modules/user/postlikeUnlike/postlikeUnlike");
//Dislike and unDislike post route
const PostDislikeUnDislike = require("../routes/modules/user/postDislikeUnDislike/postDislikeUnDislike");
//post comment route
// const Comment = require("../routes/modules/user/post/comment/comment");
//community User Join Leave Routes
const UserCommunity = require("../routes/modules/user/community/community");
//get All user of a specfic community
const AllCommunityUser = require("../routes/modules/admin/knowledgeGroup/getCommunityUsers/getCommunityUsers");
//community related invitations
const UserInvitationRespond = require("../routes/modules/user/community/invitation");
const InvitationList = require("../routes/modules/user/community/userInvitationList");
//Community Joing requests
const CommunityJoiningRequests = require("../routes/modules/admin/knowledgeGroup/acceptRejectJoining");
const JoinigRequestList = require("../routes/modules/admin/knowledgeGroup/joingRequestList");
//forgot password
const ForgotPassword = require("../routes/modules/user/forgetPassword/forgetPassword");
//admin route
const Category = require("../routes/modules/admin/category/category");
const KnowledgeGroup = require("../routes/modules/admin/knowledgeGroup/knowledgeGroup");
const AllCommunities = require("../routes/modules/user/community/getListOfAllCommunities");
const SendModeratorInvite = require("../routes/modules/admin/knowledgeGroup/sendInvite");
const Event = require("../routes/modules/user/event/event");

//General Routes
//Get User Notification
const NotificationGet = require("../routes/modules/user/notification/getUserNotifications");
//get All communities list
const AllCommuities = require("../routes/modules/admin/knowledgeGroup/GeneralGetListOfCommunities/getListCommunities");

//User Joined Communities list
const CommunitiesList = require("../routes/modules/user/community/userJoinedCommunitiesList");
const CommunityPostList = require("../routes/modules/user/community/communityPostList");
//get user News Feed
const NewsFeed = require("../routes/modules/user/newsFeed/newsFeed");
//get user all commented posts
const commentedPNewFeed = require("../routes/modules/user/post/comment/getAllCommentedPosted");
//get post detail by slug
const PostDetail = require("../routes/modules/user/post/getPostDetail");
//get User search for invite send
const SearchUserInCommunity = require("../routes/modules/admin/knowledgeGroup/searchUserforInvite/searchUserforInvite");
//Delete user from community by admin or moderator
const CommunityUserDelete = require("../routes/modules/admin/knowledgeGroup/removeUserFromCommunity/removeUserFromCommunity");
//delete moderator of community
const DeleteModeratorCommunity = require("../routes/modules/admin/knowledgeGroup/removeModeratorFromCommunity/removeModeratorFromCommunity");
//general exception handler
const voteApi = require("../routes/modules/user/post/votes/vote.api");
const featurePostApi = require("../routes/modules/admin/Featured-Post/feastured-post.api");
const commentApiV2 = require("../routes/modules/user/post/comment_section/comment/comment.api");
const replyApi = require("../routes/modules/user/post/comment_section/reply/reply.api");
const productApi = require("../routes/modules/admin/products/products.api");
const transformApi = require("../routes/modules/admin/transforming-approach/transforming-approach.api");
const caseStudyApis = require("../routes/modules/admin/case-study/case-study.api");
const counterApi = require("../routes/modules/counter/counter.api");
const aboutApi = require("../routes/modules/admin/about-us/about.api");
const genPosApi = require("../routes/modules/user/GenPost/gen-post.api");
const CommunityUserList = require("../routes/modules/user/community/userListByCommunity");
const error = require("../middleware/error");
const adApi = require("../routes/modules/admin/Ad/ad.api");
const draftApi = require("../routes/modules/user/draft/draft.api");
const slideApi = require("../routes/modules/admin/slides/slide.api");
const featuredEventApi = require("../routes/modules/featured_events/feature_event.api");
const eventCommentApi = require("../routes/modules/user/post/comment_section/event-comment/event-comment.api");
const ecvApi = require("../routes/modules/user/post/event-comment-vote/event-comment-vote.api");
const resourceCounterApi = require("../routes/modules/resources/resource.api");
const approvedEvents = require("../routes/modules/user/event/approved");
const publicProfile = require("../routes/modules/user/completeProfile/publi-profile.api");
const reportApi = require("../routes/modules/user/reports/reports.api");
const adminapi = require("../routes/modules/admin/admin.api");
const bannerApi = require("../routes/modules/admin/Banner/banner.api");
const linkApis = require("../routes/modules/admin/links/external.api");
const bannedEmailApi = require("../routes/modules/user/bannedEmails/banned-email.api");
const languageApi = require("../routes/modules/admin/languages/language.api");
const stagesApi = require("../routes/modules/admin/transforming-approach/v2/transforming-approach.api");
const stagesV3Api = require("../routes/modules/admin/transforming-approach/v3/stages.api");
const chatApi = require("../routes/modules/chat/message.api");
const getModCom = require("../routes/modules/user/community/mod-communities.api");
const analyticsApi = require("../routes/modules/admin/analytics/analytics.api");
const searchApi = require("../routes/modules/admin/knowledgeGroup/search");
const mediaUploadApi = require("../routes/modules/media/upload");
const archivedChatApi = require("../routes/modules/chat/archived-chat/archived-chat.api");
const ga = require("../routes/modules/admin/analytics/ga");
const smcounts = require("../routes/modules/admin/side-menu-counts/smc.api");
const yesSearchApi =
    require("../routes/modules/user/search/search.general.api").router;
const awardApi = require("../routes/modules/admin/award/award.api");
const tagApi = require("../routes/modules/tags/tags.api");
const eventGoingApi = require("../routes/modules/user/event/eventGoings");

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //get post detail
    app.use("/api/post/detail", PostDetail);
    app.use("/api/user/", User);
    app.use("/api/user/profile", [auth, checkUser], UserProfile);
    app.use("/api/user/public/profile", publicProfile);
    app.use("/api/forgotPassword", ForgotPassword);
    app.use("/api/post/user", [auth, checkUser], SavedPost);
    app.use("/api/Post", [auth], Post);
    app.use("/api/user/Post/", [auth, checkUser], PostLikeUnlike);
    // app.use("/api/user/Post/", [auth, checkUser], PostDislikeUnDislike);

    app.use("/api/comment", commentApiV2);
    app.use("/api/eventcomment", eventCommentApi);
    app.use("/api/reply", replyApi);
    app.use("/api/vote", voteApi);
    app.use("/api/ecv", ecvApi);
    app.use("/api/featurepost", featurePostApi);
    app.use("/api/product", productApi);
    app.use("/api/stage", transformApi);
    app.use("/api/casestudy", caseStudyApis);
    app.use("/api/counts/get", counterApi);
    app.use("/api/aboutus", aboutApi);
    app.use("/api/general", genPosApi);
    app.use("/api/userlist", CommunityUserList);
    app.use("/api/draft", draftApi);
    app.use("/api/slides", slideApi);
    app.use("/api/featured", featuredEventApi);
    app.use("/api/resource/counter", resourceCounterApi);
    app.use("/api/report", reportApi);
    app.use("/api/banner", bannerApi);
    app.use("/api/links", linkApis);
    app.use("/api/banned", bannedEmailApi);
    app.use("/api/language", languageApi);
    app.use("/api/v2/stage", stagesApi);
    app.use("/api/v3/stage", stagesV3Api);

    app.use("/api/message", chatApi);
    app.use("/api/user/mod/communities", auth, getModCom);
    app.use("/api/web/search", yesSearchApi);
    app.use("/api/media/upload", mediaUploadApi);
    app.use("/api/archive", archivedChatApi);
    app.use("/api/ga", ga);
    app.use("/api/smcount", smcounts);

    // app.use("/api/Comment", [auth], Comment);
    app.use("/api/event", [auth], Event);
    app.use("/api/event/going", eventGoingApi);
    //admin routes

    app.use("/api/category", Category);
    //admin and moderator route

    app.use("/api/knowledgeGroup", [auth], KnowledgeGroup);

    app.use(
        "/api/knowledgeGroup/Invitation",
        [auth, checkCommunityExist, checkAlreadyInvite],
        SendModeratorInvite
    );

    app.use(
        "/api/user/Invitation",
        [auth, checkUser, checkInvitation],
        UserInvitationRespond
    );
    app.use("/api/ad", adApi);

    app.use("/api/user/Invite", [auth], InvitationList);
    app.use("/api/communityAdmin/joinig", [auth], CommunityJoiningRequests);
    app.use("/api/communityAdminModerator/joinig", [auth], JoinigRequestList);
    app.use("/api/user/community", [auth], UserCommunity);
    //get all post of community
    app.use("/api/communityPosts", CommunityPostList);
    //get user NewsFeed
    app.use("/api/user/newsFeed", [auth], NewsFeed);
    //get commented news feed of user
    app.use("/api/user/commentedFeed", [auth], commentedPNewFeed);
    app.use("/api/search", searchApi);
    //search user for send invite
    app.use("/api/community/searchUser", [auth], SearchUserInCommunity);
    //get all community users
    app.use("/api/user/communityJoined", [auth], AllCommunityUser);
    //delete user from community
    app.use("/api/community/user", [auth], CommunityUserDelete);
    //delete moderator of community
    app.use("/api/community/moderator", [auth], DeleteModeratorCommunity);
    //User  Joined  Communuities list
    app.use("/api/user/joinedCommunities", [auth], CommunitiesList);
    //Get List of All communities
    app.use("/api/all/communites", auth, AllCommuities);
    //ALL communites
    app.use("/api/communities", auth, AllCommunities);
    //Get user Notification
    app.use("/api/Notification", auth, NotificationGet);
    app.use("/api/admin", auth, adminapi);
    app.use("/api/analytics", analyticsApi);
    app.use("/api/award", [auth], awardApi);
    app.use("/api/tag", tagApi);

    app.use(error);
};
