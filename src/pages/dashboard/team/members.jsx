// 'use client';

// import * as React from 'react';
// import Button from '@mui/joy/Button';
// import Grid from '@mui/joy/Grid';
// import Stack from '@mui/joy/Stack';
// import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import { Helmet } from 'react-helmet-async';

// import { config } from '@/config';
// import { useModal } from '@/hooks/use-modal';
// import { InviteModal } from '@/components/dashboard/team/invite-modal';
// import { MemberCard } from '@/components/dashboard/team/member-card';
// import { MemberModal } from '@/components/dashboard/team/member-modal';
// import { MembersFilter } from '@/components/dashboard/team/members-filter';
// import { MembersPagination } from '@/components/dashboard/team/members-pagination';

// const metadata = {
//   title: `Members | Team | Dashboard | ${config.site.name}`,
// };

// const members = [
//   {
//     id: 'USR-001',
//     avatar: '/assets/avatar-1.png',
//     name: 'Zaid Schwartz',
//     username: 'zaid',
//     role: 'member',
//     position: 'Web Designer',
//     tags: ['Design', 'Marketing'],
//     status: 'online',
//   },
//   {
//     id: 'USR-008',
//     avatar: '/assets/avatar-8.png',
//     name: 'Kimberly Maestra',
//     username: 'kimberly',
//     role: 'admin',
//     position: 'CEO',
//     tags: ['All'],
//     status: 'online',
//   },
//   {
//     id: 'USR-003',
//     avatar: '/assets/avatar-3.png',
//     name: 'Ammar Foley',
//     username: 'ammar',
//     role: 'readOnly',
//     position: 'Marketing Coordinator',
//     tags: ['Design', 'Marketing'],
//     status: 'busy',
//   },
//   {
//     id: 'USR-004',
//     avatar: '/assets/avatar-4.png',
//     name: 'Pippa Wilkinson',
//     username: 'pippa',
//     role: 'member',
//     position: 'Software Tester',
//     tags: ['Development'],
//     status: 'away',
//     pending: true,
//   },
// ];

// export function Page() {
//   const inviteModal = useModal();
//   const memberModal = useModal();

//   return (
//     <React.Fragment>
//       <Helmet>
//         <title>{metadata.title}</title>
//       </Helmet>
//       <main>
//         <Stack spacing={3}>
//           <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
//             <MembersFilter />
//             <Button
//               onClick={inviteModal.handleOpen}
//               startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
//             >
//               Add Member
//             </Button>
//           </Stack>
//           <Grid container spacing={3}>
//             {members.map((member) => (
//               <Grid key={member.id} lg={4} md={6} xl={3} xs={12}>
//                 <MemberCard
//                   member={member}
//                   onView={() => {
//                     memberModal.handleOpen();
//                   }}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           <MembersPagination />
//         </Stack>
//       </main>
//       <InviteModal onClose={inviteModal.handleClose} open={inviteModal.open} />
//       <MemberModal
//         member={{
//           avatar: '/assets/avatar-1.png',
//           name: 'Zaid Schwartz',
//           status: 'online',
//           username: 'zaid',
//         }}
//         onClose={memberModal.handleClose}
//         open={memberModal.open}
//       />
//     </React.Fragment>
//   );
// }
