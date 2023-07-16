import path from 'path';
import Community from '../models/Community';
import User from '../models/User';

export const getCommunities = async (req, res) => {
  try {
      const communities = await Community.find({}).populate('owner');
      return res.render('communities', { communities, userId: req.session.user?._id });
  } catch (error) {
      console.log(error);
      res.status(400).render('errorPage', { errorMessage: error.message });
  }
};

export const getCommunity = async (req, res) => {
  const { id } = req.params;
  const community = await Community.findById(id).populate('owner').populate('members').populate('posts.postedBy');
  return res.render('community', { community, userId: req.session.user?._id });
};


export const postCommunity = async (req, res) => {
  const { name, topic, description } = req.body;
  const {
    user: { _id },
  } = req.session;
  try {
    const newCommunity = await Community.create({ 
      name, 
      topic,
      description,
      owner: _id,
      members: [_id]
    });
    
    const user = await User.findById(_id);
    user.communities.push(newCommunity._id);
    user.save();
    
    const communities = await Community.find({}).populate('owner');
    return res.render('community', { communities });
  } catch (error) {
    console.log(error);
    req.flash('error', error._message);
    return res.redirect('/community');
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
