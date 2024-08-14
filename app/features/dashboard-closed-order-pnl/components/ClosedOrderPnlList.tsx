import * as React from 'react';

import {
  AutorenewRounded as AutorenewRoundedIcon,
  Block as BlockIcon,
  CheckRounded as CheckRoundedIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Dropdown,
  IconButton,
  Link,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from '@mui/joy';
import { ColorPaletteProp } from '@mui/joy/styles';



// export function ClosedOrderPnlList() {
// return (
  // <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
    //   {listItems.map((listItem) => (
    //     <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
    //       <ListItem
    //         sx={{
    //           display: 'flex',
    //           justifyContent: 'space-between',
    //           alignItems: 'start',
    //         }}
    //       >
    //         <ListItemContent
    //           sx={{ display: 'flex', gap: 2, alignItems: 'start' }}
    //         >
    //           <ListItemDecorator>
    //             <Avatar size="sm">{listItem.customer.initial}</Avatar>
    //           </ListItemDecorator>
    //           <div>
    //             <Typography gutterBottom sx={{ fontWeight: 600 }}>
    //               {listItem.customer.name}
    //             </Typography>
    //             <Typography level="body-xs" gutterBottom>
    //               {listItem.customer.email}
    //             </Typography>
    //             <Box
    //               sx={{
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'space-between',
    //                 gap: 0.5,
    //                 mb: 1,
    //               }}
    //             >
    //               <Typography level="body-xs">{listItem.date}</Typography>
    //               <Typography level="body-xs">&bull;</Typography>
    //               <Typography level="body-xs">{listItem.id}</Typography>
    //             </Box>
    //             <Box
    //               sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
    //               <Link level="body-sm" component="button">
    //                 Download
    //               </Link>
    //             </Box>
    //           </div>
    //         </ListItemContent>
    //         <Chip
    //           variant="soft"
    //           size="sm"
    //           startDecorator={
    //             {
    //               Paid: <CheckRoundedIcon />,
    //               Refunded: <AutorenewRoundedIcon />,
    //               Cancelled: <BlockIcon />,
    //             }[listItem.status]
    //           }
    //           color={
    //             {
    //               Paid: 'success',
    //               Refunded: 'neutral',
    //               Cancelled: 'danger',
    //             }[listItem.status] as ColorPaletteProp
    //           }
    //         >
    //           {listItem.status}
    //         </Chip>
    //       </ListItem>
    //       <ListDivider />
    //     </List>
    //   ))}

    //   <Box
    //     className="Pagination-mobile"
    //     sx={{
    //       display: { xs: 'flex', md: 'none' },
    //       alignItems: 'center',
    //       py: 2,
    //     }}
    //   >
    //     <IconButton
    //       aria-label="previous page"
    //       variant="outlined"
    //       color="neutral"
    //       size="sm"
    //     >
    //       <KeyboardArrowLeftIcon />
    //     </IconButton>
    //     <Typography level="body-sm" sx={{ mx: 'auto' }}>
    //       Page 1 of 10
    //     </Typography>
    //     <IconButton
    //       aria-label="next page"
    //       variant="outlined"
    //       color="neutral"
    //       size="sm"
    //     >
    //       <KeyboardArrowRightIcon />
    //     </IconButton>
    //   </Box>
    // </Box>
  // );
// }
