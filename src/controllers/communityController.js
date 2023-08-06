// Import relevant models
import Community from '../models/Community';
import User from '../models/User';

// Get all communities and render the communities page
export const getCommunities = async (req, res) => {
  try {
      const communities = await Community.find({}).populate('owner');
      return res.render('communities', { pageTitle: "Communities", communities, userId: req.session.user?._id });
  } catch (error) {
      console.log(error);
      res.status(400).render('errorPage', { errorMessage: error.message });
  }
};

// Get a single community by ID and render the community home page
export const getCommunity = async (req, res) => {
  const { id } = req.params;
  const community = await Community.findById(id).populate('owner').populate('members').populate('posts.postedBy');
  return res.render('community-home', { pageTitle: "Community", community, userId: req.session.user?._id });
};

// Create a new community and render the community page
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

// Add a user to a community's member list and redirect to the community's page
export const joinCommunity = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.user;
  try {
    const community = await Community.findById(id);
    if (!community.members.includes(_id)) {
      community.members.push(_id);
      await community.save();

      // Finding user and ensuring the user exists
      const user = await User.findById(_id);
      if (!user) {
        console.log(`User with ID ${_id} not found`);
        return res.redirect('/community'); // Redirect to a suitable error or community page
      }
      user.communities.push(id);
      await user.save();
    }
    res.redirect(`/community/${id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/community'); // Redirect to a suitable error or community page
  }
};

// Delete a community if the user is the owner and redirect to the community page
export const deleteCommunity = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.session.user;
  const community = await Community.findById(id);
  if (String(community.owner) === String(_id)) {
    await Community.findByIdAndDelete(id);
  }
  res.redirect('/community');
};

// Post a new post within a community and redirect to the community's page
export const postPost = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description } = req.body;

  // Get the full URL including the domain
  const fullUrl = req.protocol + '://' + req.get('host') + '/uploads/posts/';
  // Concatenate the full URL with the filename of the uploaded file
  const fileUrl = req.file ? fullUrl + req.file.filename : undefined;

  const community = await Community.findById(id);

  community.posts.push({
    title,
    description,
    image: fileUrl, // Use the full URL here
    postedBy: _id,
  });

  await community.save();

  res.redirect(`/community/${id}`);
};
