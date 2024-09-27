// cloudinary webhook notification
// Handle Cloudinary webhook events
// router.post('/cloudinary-webhook', async (req, res) => {
//     console.log('Webhook received:', req.body);
//     const { public_id, secure_url, resource_type, event_type } = req.body;

//     console.log('Received webhook:', req.body);

//     try {
//         if (resource_type === 'image') {
//             if (event_type === 'upload' || event_type === 'update') {
//                 // Handle image upload or update
//                 const updatedBanner = await Banner.findOneAndUpdate(
//                     { public_id: public_id },
//                     { url: secure_url , name: imageName },
//                     { new: true, upsert: true }
//                 );
//                 console.log('Image updated or created in MongoDB:', updatedBanner);
//             } else if (event_type === 'delete') {
//                 // Handle image deletion
//                 const deletedBanner = await Banner.findOneAndDelete({ public_id: public_id });
//                 console.log('Image deleted from MongoDB:', deletedBanner);
//             }
//         } else if (resource_type === 'video') {
//             if (event_type === 'upload' || event_type === 'update') {
//                 // Handle video upload or update
//                 // You might need to store video information in a different collection or model
//                 console.log('Video uploaded or updated. You might want to handle this differently.');
//             } else if (event_type === 'delete') {
//                 // Handle video deletion
//                 console.log('Video deleted. You might want to handle this differently.');
//             }
//         } else {
//             console.log('Unsupported resource type:', resource_type);
//         }

//         res.status(200).send('Resource updated');
//     } catch (error) {
//         console.error('Error handling webhook event:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });