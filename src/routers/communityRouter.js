import express from 'express';
import { getCommunities, getCommunity, postCommunity, joinCommunity, deleteCommunity, postPost } from '../controllers/communityController';
import { communityProfileUpload } from '../middlewares'; // new

const communityRouter = express.Router();

communityRouter.get('/', getCommunities);
communityRouter.get('/:id([0-9a-f]{24})', getCommunity);
communityRouter.post('/', communityProfileUpload.single('profilePicture'), postCommunity); // changed
communityRouter.post('/:id([0-9a-f]{24})/join', joinCommunity);
communityRouter.delete('/:id([0-9a-f]{24})', deleteCommunity);
communityRouter.post('/:id([0-9a-f]{24})/post', postPost);

export default communityRouter;

