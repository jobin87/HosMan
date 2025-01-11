import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageIcon from '@mui/icons-material/Message';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { Review, reviewsData } from 'src/assets/data/review-types';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export function ProductReviewListView() {
  const params = useParams();
  const [selectedCategory, setSelectedCategory] = useState('OverAll-Review');
  const [productReviews, setProductReviews] = useState<Review[]>(
    reviewsData.find((product) => product.id === params.id)?.reviews || []
  );
  const [activeReplyIndex, setActiveReplyIndex] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  const handleReplyButtonClick = (reviewId: number) => {
    setActiveReplyIndex(reviewId);
  };

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(event.target.value);
  };

  const handleSaveReply = () => {
    if (activeReplyIndex !== null && replyText.trim()) {
      setProductReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === activeReplyIndex
            ? { ...review, replies: [...review.replies, replyText] }
            : review
        )
      );
      setReplyText('');
      setActiveReplyIndex(null);
    }
  };

  const filteredReviews =
    selectedCategory === 'OverAll-Review' ? productReviews : productReviews.slice(0, 1);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={params?.id ? '' : 'Reviews'}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Reviews', href: paths.dashboard.product.review.list },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 4, md: 3 } }}
      />

      <Box sx={{ p: 4 }}>
        {filteredReviews.map((review) => (
          <Paper elevation={1} sx={{ p: 3, mb: 3 }} key={review.id}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={review.avatar} alt={review.name} sx={{ width: 50, height: 50, mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {review.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Spend: ${review.spend} • Total Reviews: {review.reviewCount}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Rating value={review.rating} readOnly precision={0.5} />
              <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                {format(new Date(review.date), 'dd-MM-yyyy')}
              </Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              {review.reviewText}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" spacing={2} mb={2}>
              <Button
                variant="outlined"
                startIcon={<MessageIcon />}
                onClick={() => handleReplyButtonClick(review.id)}
              >
                Reply
              </Button>
              <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
                Like
              </Button>
            </Stack>
            {activeReplyIndex === review.id && (
              <Box display="flex" flexDirection="column">
                <TextField
                  multiline
                  rows={4}
                  value={replyText}
                  onChange={handleReplyChange}
                  variant="outlined"
                  label="Write a reply"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleSaveReply}>
                  Save Reply
                </Button>
              </Box>
            )}
            {review.replies.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" fontWeight="medium">
                  Replies:
                </Typography>
                {review.replies.map((reply, index) => (
                  <Box key={index} sx={{ pl: 3, mt: 1 }}>
                    <Typography variant="body2">{reply}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    </DashboardContent>
  );
}
