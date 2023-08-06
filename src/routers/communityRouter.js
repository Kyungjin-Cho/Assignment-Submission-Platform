// Import express to create the router
import express from 'express';
// Import community controllers to handle community-related routes
import { getCommunities, getCommunity, postCommunity, joinCommunity, deleteCommunity, postPost } from '../controllers/communityController';
// Import the middleware to handle post uploads
import { postUpload } from '../middlewares';

// Initialize the express router for community-related routes
const communityRouter = express.Router();

// Route to get the list of all communities
communityRouter.get('/', getCommunities);
// Route to get a specific community by its ID
communityRouter.get('/:id([0-9a-f]{24})', getCommunity);
// Route to create a new community
communityRouter.post('/', postCommunity);
// Route to join a specific community by its ID
communityRouter.post('/:id([0-9a-f]{24})/join', joinCommunity);
// Route to delete a specific community by its ID
communityRouter.post('/:id([0-9a-f]{24})/delete', deleteCommunity);
// Route to post in a specific community by its ID, with postUpload middleware to handle image upload
communityRouter.post('/:id([0-9a-f]{24})/post', postUpload.single('image'), postPost);

// Export the communityRouter
export default communityRouter;


