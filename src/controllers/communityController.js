import path from 'path';
import Community from '../models/Community';
import User from '../models/User';

export const getCommunities = async (req, res) => {
  try {
      const communities = await Community.find({}).populate('owner');
      return res.render('communities', { communities });
  } catch (error) {
      console.log(error);
      res.status(400).render('errorPage', { errorMessage: error.message });
  }
};

export const getCommunity = async (req, res) => {
  const { id } = req.params;
  const community = await Community.findById(id).populate('owner').populate('members').populate('posts.postedBy');
  return res.render('community', { community });
};

export const postCommunity = async (req, res) => {
  const { name, topic } = req.body;
  const file = req.file ? path.join('/uploads/communityProfilePictures', req.file.filename) : undefined;
  const {
    user: { _id },
  } = req.session;
  try {
    const newCommunity = await Community.create({ 
      name, 
      topic,
      profilePicture: file,
      owner: _id,
      members: [_id]
    });

    const communities = await Community.find({}).populate('owner');
    
    res.render('communities', { communities });
  } catch (error) {
    console.log(error);
    res.status(400).render('createCommunity', { errorMessage: error._message });
  }
};


export const joinCommunity = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const community = await Community.findById(id);
  if (!community.members.includes(_id)) {
    community.members.push(_id);
    await community.save();
  }
  res.redirect(`/community/${id}`);
};

export const deleteCommunity = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const community = await Community.findById(id);
  if (String(community.owner) === String(_id)) {
    await Community.findByIdAndDelete(id);
  }
  res.redirect('/');
};

export const postPost = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { content } = req.body;
  const community = await Community.findById(id);
  community.posts.push({ content, postedBy: _id });
  await community.save();
  res.redirect(`/community/${id}`);
};
