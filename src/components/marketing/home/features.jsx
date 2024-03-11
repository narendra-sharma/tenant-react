// 'use client';

// import * as React from 'react';
// import Box from '@mui/joy/Box';
// import Card from '@mui/joy/Card';
// import Container from '@mui/joy/Container';
// import Grid from '@mui/joy/Grid';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import { motion } from 'framer-motion';

// import { Image } from '@/components/core/image';

// const features = [
//   {
//     id: 1,
//     title: 'Built by experts',
//     description: "All of the code follows MUI best practices, it's written by our in-house team of experts.",
//     icon: (
//       <svg fill="none" height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg">
//         <rect fill="white" height="47" rx="11.5" width="47" x="1.5" y="1.5" />
//         <path
//           d="M1 12.6129H49M1 37.3871H49M12.6129 49V1M37.3871 49V1M4.61394 4.61394L45.9032 45.9032M4.61394 45.3861L45.3861 4.61394M42.8065 25.5172C42.8065 35.3494 34.8354 43.3236 25 43.3236C15.1646 43.3236 7.19355 35.3494 7.19355 25.5172C7.19355 15.6818 15.1646 7.71071 25 7.71071C34.8354 7.71071 42.8065 15.6818 42.8065 25.5172Z"
//           opacity="0.08"
//           stroke="black"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="0.5"
//         />
//         <path
//           d="M24.7357 27.7131C25.678 26.9211 26.3538 25.8585 26.6716 24.6693C26.9894 23.4802 26.9338 22.2221 26.5124 21.0656C26.0909 19.9091 25.3239 18.9103 24.3155 18.2045C23.3071 17.4987 22.106 17.1201 20.8751 17.1201C19.6442 17.1201 18.4431 17.4987 17.4347 18.2045C16.4262 18.9103 15.6593 19.9091 15.2378 21.0656C14.8163 22.2221 14.7607 23.4802 15.0785 24.6693C15.3964 25.8585 16.0722 26.9211 17.0145 27.7131C15.5431 28.3784 14.2681 29.4116 13.3123 30.7131C13.1357 30.9537 13.062 31.2545 13.1073 31.5494C13.1525 31.8444 13.3131 32.1092 13.5537 32.2858C13.7942 32.4623 14.0951 32.536 14.39 32.4908C14.6849 32.4455 14.9498 32.2849 15.1263 32.0444C15.788 31.1407 16.6533 30.4058 17.6521 29.8992C18.6509 29.3926 19.7551 29.1286 20.8751 29.1286C21.995 29.1286 23.0992 29.3926 24.098 29.8992C25.0969 30.4058 25.9622 31.1407 26.6238 32.0444C26.8004 32.285 27.0653 32.4457 27.3603 32.4911C27.6553 32.5365 27.9563 32.4628 28.197 32.2862C28.4376 32.1097 28.5983 31.8448 28.6437 31.5498C28.6891 31.2547 28.6154 30.9538 28.4388 30.7131C27.4825 29.4118 26.2072 28.3786 24.7357 27.7131ZM17.1251 23.125C17.1251 22.3833 17.345 21.6583 17.7571 21.0416C18.1691 20.4249 18.7548 19.9443 19.44 19.6604C20.1252 19.3766 20.8792 19.3023 21.6067 19.447C22.3341 19.5917 23.0023 19.9489 23.5267 20.4733C24.0512 20.9978 24.4083 21.666 24.553 22.3934C24.6977 23.1208 24.6235 23.8748 24.3396 24.56C24.0558 25.2453 23.5752 25.8309 22.9585 26.243C22.3418 26.6551 21.6168 26.875 20.8751 26.875C19.8805 26.875 18.9267 26.4799 18.2234 25.7766C17.5202 25.0734 17.1251 24.1195 17.1251 23.125ZM36.447 32.2815C36.3279 32.3691 36.1927 32.4323 36.0492 32.4675C35.9056 32.5028 35.7566 32.5094 35.6105 32.487C35.4644 32.4646 35.3241 32.4137 35.1977 32.3371C35.0713 32.2605 34.9613 32.1598 34.8738 32.0406C34.2106 31.1387 33.3449 30.4051 32.3464 29.8987C31.348 29.3923 30.2446 29.1273 29.1251 29.125C28.8267 29.125 28.5406 29.0065 28.3296 28.7955C28.1186 28.5845 28.0001 28.2984 28.0001 28C28.0001 27.7016 28.1186 27.4155 28.3296 27.2045C28.5406 26.9935 28.8267 26.875 29.1251 26.875C29.6772 26.8743 30.2224 26.7518 30.7217 26.516C31.221 26.2803 31.6621 25.9372 32.0135 25.5113C32.3648 25.0853 32.6178 24.5871 32.7543 24.0521C32.8908 23.517 32.9075 22.9585 32.8031 22.4163C32.6988 21.8741 32.476 21.3616 32.1506 20.9155C31.8253 20.4693 31.4055 20.1006 30.9211 19.8355C30.4368 19.5704 29.8999 19.4155 29.3487 19.3819C28.7976 19.3484 28.2458 19.4369 27.7329 19.6412C27.5955 19.6975 27.4483 19.726 27.2998 19.7251C27.1514 19.7242 27.0045 19.6939 26.8678 19.636C26.7311 19.5781 26.6072 19.4937 26.5033 19.3877C26.3993 19.2817 26.3174 19.1561 26.2622 19.0183C26.207 18.8804 26.1797 18.733 26.1817 18.5846C26.1838 18.4361 26.2152 18.2895 26.2742 18.1532C26.3332 18.017 26.4185 17.8938 26.5254 17.7906C26.6322 17.6875 26.7584 17.6066 26.8966 17.5525C28.2207 17.0224 29.6903 16.9812 31.0419 17.4365C32.3935 17.8917 33.5388 18.8135 34.2723 20.0366C35.0059 21.2597 35.2798 22.7042 35.0448 24.1109C34.8099 25.5177 34.0816 26.7947 32.9904 27.7131C34.4617 28.3784 35.7368 29.4116 36.6926 30.7131C36.8674 30.9539 36.9396 31.2541 36.8936 31.548C36.8476 31.842 36.687 32.1057 36.447 32.2815Z"
//           fill="#555E68"
//         />
//         <rect height="47" rx="11.5" stroke="#EAEEF6" width="47" x="1.5" y="1.5" />
//       </svg>
//     ),
//   },
//   {
//     id: 2,
//     title: 'Design Files',
//     description:
//       "We've included the source Figma files to Plus & Extended licenses so you can get creative! Build layouts with confidence.",
//     icon: (
//       <svg fill="none" height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg">
//         <rect fill="white" height="47" rx="11.5" width="47" x="1.5" y="1.5" />
//         <path
//           d="M1 12.6129H49M1 37.3871H49M12.6129 49V1M37.3871 49V1M4.61394 4.61394L45.9032 45.9032M4.61394 45.3861L45.3861 4.61394M42.8065 25.5172C42.8065 35.3494 34.8354 43.3236 25 43.3236C15.1646 43.3236 7.19355 35.3494 7.19355 25.5172C7.19355 15.6818 15.1646 7.71071 25 7.71071C34.8354 7.71071 42.8065 15.6818 42.8065 25.5172Z"
//           opacity="0.08"
//           stroke="black"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="0.5"
//         />
//         <path
//           d="M32.0847 17.7815C30.663 16.3829 28.8597 15.4357 26.9013 15.059C24.9429 14.6824 22.9169 14.893 21.0778 15.6644C19.2388 16.4358 17.6688 17.7336 16.5651 19.3946C15.4615 21.0557 14.8735 23.0059 14.875 25.0002C14.875 29.1927 17.4625 32.7112 21.625 34.1821C22.134 34.3621 22.6788 34.4173 23.2137 34.3431C23.7485 34.2689 24.2577 34.0675 24.6985 33.7558C25.1394 33.4441 25.499 33.0312 25.7472 32.5517C25.9954 32.0722 26.125 31.5401 26.125 31.0002C26.125 30.7019 26.2435 30.4157 26.4545 30.2047C26.6655 29.9938 26.9516 29.8752 27.25 29.8752H31.5822C32.3479 29.8788 33.0918 29.6204 33.6903 29.1429C34.2889 28.6654 34.7062 27.9976 34.8728 27.2502C35.0467 26.4841 35.1313 25.7005 35.125 24.9149C35.1158 23.5838 34.8422 22.2678 34.3203 21.0432C33.7984 19.8187 33.0385 18.71 32.0847 17.7815ZM32.6791 26.7505C32.6232 26.9992 32.4839 27.2213 32.2844 27.3799C32.0849 27.5386 31.8371 27.6241 31.5822 27.6224H27.25C26.3549 27.6224 25.4965 27.978 24.8635 28.6109C24.2306 29.2439 23.875 30.1023 23.875 30.9974C23.8748 31.1773 23.8315 31.3545 23.7486 31.5141C23.6658 31.6738 23.5459 31.8113 23.399 31.9151C23.2521 32.0188 23.0824 32.0858 22.9042 32.1105C22.7261 32.1352 22.5446 32.1167 22.375 32.0568C20.8141 31.5055 19.5016 30.5793 18.58 29.3793C17.6227 28.1214 17.1108 26.5809 17.125 25.0002C17.1249 22.9257 17.9434 20.9349 19.4026 19.4604C20.8619 17.9859 22.844 17.1467 24.9184 17.1252H25C27.0745 17.1337 29.0626 17.957 30.5357 19.4176C32.0088 20.8783 32.849 22.8593 32.875 24.9337C32.8801 25.5461 32.8144 26.157 32.6791 26.7543V26.7505ZM26.5 20.1252C26.5 20.4219 26.412 20.7119 26.2472 20.9586C26.0824 21.2053 25.8481 21.3975 25.574 21.511C25.2999 21.6246 24.9983 21.6543 24.7074 21.5964C24.4164 21.5385 24.1491 21.3957 23.9393 21.1859C23.7296 20.9761 23.5867 20.7088 23.5288 20.4179C23.4709 20.1269 23.5007 19.8253 23.6142 19.5512C23.7277 19.2771 23.92 19.0428 24.1666 18.878C24.4133 18.7132 24.7033 18.6252 25 18.6252C25.3978 18.6252 25.7794 18.7833 26.0607 19.0646C26.342 19.3459 26.5 19.7274 26.5 20.1252ZM22.375 22.3752C22.375 22.6719 22.287 22.9619 22.1222 23.2086C21.9574 23.4553 21.7231 23.6475 21.449 23.761C21.1749 23.8746 20.8733 23.9043 20.5824 23.8464C20.2914 23.7885 20.0241 23.6457 19.8143 23.4359C19.6046 23.2261 19.4617 22.9588 19.4038 22.6679C19.3459 22.3769 19.3757 22.0753 19.4892 21.8012C19.6027 21.5271 19.795 21.2928 20.0416 21.128C20.2883 20.9632 20.5783 20.8752 20.875 20.8752C21.2728 20.8752 21.6544 21.0333 21.9357 21.3146C22.217 21.5959 22.375 21.9774 22.375 22.3752ZM22.375 27.6252C22.375 27.9219 22.287 28.2119 22.1222 28.4586C21.9574 28.7053 21.7231 28.8975 21.449 29.011C21.1749 29.1246 20.8733 29.1543 20.5824 29.0964C20.2914 29.0385 20.0241 28.8957 19.8143 28.6859C19.6046 28.4761 19.4617 28.2088 19.4038 27.9179C19.3459 27.6269 19.3757 27.3253 19.4892 27.0512C19.6027 26.7771 19.795 26.5428 20.0416 26.378C20.2883 26.2132 20.5783 26.1252 20.875 26.1252C21.2728 26.1252 21.6544 26.2833 21.9357 26.5646C22.217 26.8459 22.375 27.2274 22.375 27.6252ZM30.625 22.3752C30.625 22.6719 30.537 22.9619 30.3722 23.2086C30.2074 23.4553 29.9731 23.6475 29.699 23.761C29.4249 23.8746 29.1233 23.9043 28.8324 23.8464C28.5414 23.7885 28.2741 23.6457 28.0643 23.4359C27.8546 23.2261 27.7117 22.9588 27.6538 22.6679C27.5959 22.3769 27.6257 22.0753 27.7392 21.8012C27.8527 21.5271 28.045 21.2928 28.2916 21.128C28.5383 20.9632 28.8283 20.8752 29.125 20.8752C29.5228 20.8752 29.9044 21.0333 30.1857 21.3146C30.467 21.5959 30.625 21.9774 30.625 22.3752Z"
//           fill="#555E68"
//         />
//         <rect height="47" rx="11.5" stroke="#EAEEF6" width="47" x="1.5" y="1.5" />
//       </svg>
//     ),
//   },
//   {
//     id: 3,
//     title: 'Latest technologies',
//     description:
//       "Each template is a well-structured Next.js project, giving you a codebase that's productive and enjoyable to work in.",
//     icon: (
//       <svg fill="none" height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg">
//         <rect fill="white" height="47" rx="11.5" width="47" x="1.5" y="1.5" />
//         <path
//           d="M1 12.6129H49M1 37.3871H49M12.6129 49V1M37.3871 49V1M4.61394 4.61394L45.9032 45.9032M4.61394 45.3861L45.3861 4.61394M42.8065 25.5172C42.8065 35.3494 34.8354 43.3236 25 43.3236C15.1646 43.3236 7.19355 35.3494 7.19355 25.5172C7.19355 15.6818 15.1646 7.71071 25 7.71071C34.8354 7.71071 42.8065 15.6818 42.8065 25.5172Z"
//           opacity="0.08"
//           stroke="black"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="0.5"
//         />
//         <path
//           d="M19.7199 22.1146L16.2568 25.0002L19.7199 27.8859C19.8348 27.98 19.9299 28.0959 19.9997 28.227C20.0695 28.358 20.1127 28.5016 20.1268 28.6494C20.1409 28.7973 20.1255 28.9464 20.0817 29.0883C20.0378 29.2301 19.9663 29.3619 19.8713 29.476C19.7762 29.5901 19.6595 29.6843 19.5279 29.753C19.3963 29.8218 19.2524 29.8639 19.1045 29.8768C18.9565 29.8896 18.8075 29.8731 18.666 29.8281C18.5245 29.7831 18.3933 29.7106 18.2799 29.6146L13.7799 25.8646C13.6532 25.759 13.5512 25.6269 13.4813 25.4775C13.4113 25.3281 13.375 25.1652 13.375 25.0002C13.375 24.8353 13.4113 24.6724 13.4813 24.523C13.5512 24.3736 13.6532 24.2414 13.7799 24.1359L18.2799 20.3859C18.5095 20.1977 18.8041 20.1079 19.0996 20.1361C19.3951 20.1642 19.6675 20.3079 19.8574 20.536C20.0474 20.764 20.1395 21.0579 20.1138 21.3536C20.088 21.6493 19.9465 21.9228 19.7199 22.1146ZM36.2199 24.1359L31.7199 20.3859C31.6066 20.2899 31.4754 20.2174 31.3339 20.1724C31.1924 20.1274 31.0434 20.1108 30.8954 20.1237C30.7475 20.1366 30.6036 20.1787 30.472 20.2474C30.3404 20.3162 30.2237 20.4104 30.1286 20.5245C30.0336 20.6386 29.9621 20.7703 29.9182 20.9122C29.8744 21.0541 29.859 21.2032 29.8731 21.3511C29.8872 21.4989 29.9304 21.6425 30.0002 21.7735C30.07 21.9046 30.1651 22.0205 30.2799 22.1146L33.7431 25.0002L30.2799 27.8859C30.1651 27.98 30.07 28.0959 30.0002 28.227C29.9304 28.358 29.8872 28.5016 29.8731 28.6494C29.859 28.7973 29.8744 28.9464 29.9182 29.0883C29.9621 29.2301 30.0336 29.3619 30.1286 29.476C30.2237 29.5901 30.3404 29.6843 30.472 29.753C30.6036 29.8218 30.7475 29.8639 30.8954 29.8768C31.0434 29.8896 31.1924 29.8731 31.3339 29.8281C31.4754 29.7831 31.6066 29.7106 31.7199 29.6146L36.2199 25.8646C36.3467 25.759 36.4487 25.6269 36.5186 25.4775C36.5886 25.3281 36.6249 25.1652 36.6249 25.0002C36.6249 24.8353 36.5886 24.6724 36.5186 24.523C36.4487 24.3736 36.3467 24.2414 36.2199 24.1359ZM28.3843 15.6927C28.2455 15.6422 28.098 15.6196 27.9504 15.6261C27.8027 15.6326 27.6578 15.6681 27.5239 15.7306C27.39 15.7931 27.2698 15.8814 27.17 15.9904C27.0702 16.0994 26.9929 16.227 26.9424 16.3659L20.9424 32.8659C20.8407 33.1462 20.8545 33.4555 20.9807 33.7257C21.107 33.9959 21.3353 34.2049 21.6156 34.3068C21.7386 34.3522 21.8688 34.3754 21.9999 34.3752C22.2309 34.3753 22.4563 34.3042 22.6455 34.1717C22.8347 34.0392 22.9785 33.8517 23.0574 33.6346L29.0574 17.1346C29.1079 16.9957 29.1306 16.8483 29.1241 16.7007C29.1176 16.553 29.0821 16.4081 29.0196 16.2742C28.9571 16.1403 28.8688 16.0201 28.7598 15.9203C28.6508 15.8205 28.5232 15.7432 28.3843 15.6927Z"
//           fill="#555E68"
//         />
//         <rect height="47" rx="11.5" stroke="#EAEEF6" width="47" x="1.5" y="1.5" />
//       </svg>
//     ),
//   },
//   {
//     id: 4,
//     title: 'Easy to customize',
//     description:
//       'Everything is styled using global theme overrides, just open the theme file in your editor and change whatever you want.',
//     icon: (
//       <svg fill="none" height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg">
//         <rect fill="white" height="47" rx="11.5" width="47" x="1.5" y="1.5" />
//         <path
//           d="M1 12.6129H49M1 37.3871H49M12.6129 49V1M37.3871 49V1M4.61394 4.61394L45.9032 45.9032M4.61394 45.3861L45.3861 4.61394M42.8065 25.5172C42.8065 35.3494 34.8354 43.3236 25 43.3236C15.1646 43.3236 7.19355 35.3494 7.19355 25.5172C7.19355 15.6818 15.1646 7.71071 25 7.71071C34.8354 7.71071 42.8065 15.6818 42.8065 25.5172Z"
//           opacity="0.08"
//           stroke="black"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="0.5"
//         />
//         <path
//           d="M35.0116 26.9986L33.2219 22.1039C33.051 21.6385 32.7027 21.2598 32.2533 21.0506C31.8039 20.8414 31.2899 20.8186 30.8238 20.9873L25.0759 23.0704L26.0969 17.2354C26.1837 16.7466 26.073 16.2432 25.7892 15.8358C25.5053 15.4284 25.0715 15.1502 24.5828 15.0623L19.4566 14.1539C19.2143 14.1112 18.966 14.1167 18.7259 14.1702C18.4857 14.2236 18.2585 14.3239 18.0572 14.4654C17.856 14.6068 17.6846 14.7866 17.5529 14.9944C17.4213 15.2022 17.3319 15.434 17.29 15.6764L14.9463 29.0948C14.7391 30.2657 15.0039 31.4711 15.6826 32.4474C16.3614 33.4237 17.399 34.0917 18.5688 34.3054C18.8382 34.3517 19.111 34.375 19.3844 34.3748H33.25C33.7473 34.3748 34.2242 34.1773 34.5758 33.8256C34.9275 33.474 35.125 32.9971 35.125 32.4998V27.6426C35.1221 27.4232 35.0838 27.2057 35.0116 26.9986ZM21.5313 30.2667C21.4816 30.559 21.3744 30.8385 21.2157 31.0889C21.057 31.3394 20.85 31.5558 20.6069 31.7254C20.3704 31.8924 20.103 32.0106 19.8204 32.0732C19.5378 32.1358 19.2455 32.1415 18.9606 32.0901C18.3767 31.9814 17.8595 31.6461 17.5218 31.1575C17.1841 30.669 17.0532 30.0667 17.1578 29.482L19.4416 16.4367L23.8159 17.2186L21.5313 30.2667ZM23.7475 30.6539L24.6278 25.6251L31.2363 23.2307L32.7644 27.4111L23.7428 30.6801C23.7456 30.6717 23.7484 30.6632 23.7494 30.6539H23.7475ZM32.875 32.1248H26.3613L32.875 29.7642V32.1248ZM20.6144 29.3189L20.4831 30.0689C20.4375 30.3296 20.3013 30.5659 20.0986 30.7362C19.896 30.9065 19.6397 30.9998 19.375 30.9998C19.3097 30.9997 19.2444 30.9941 19.18 30.9829C18.8861 30.9315 18.6247 30.7654 18.4533 30.5211C18.2819 30.2769 18.2145 29.9746 18.2659 29.6807L18.3972 28.9307C18.4498 28.6379 18.6162 28.3778 18.8601 28.2074C19.104 28.037 19.4055 27.9702 19.6985 28.0215C19.9916 28.0728 20.2524 28.2381 20.4239 28.4813C20.5953 28.7244 20.6644 29.0256 20.6144 29.3189Z"
//           fill="#555E68"
//         />
//         <rect height="47" rx="11.5" stroke="#EAEEF6" width="47" x="1.5" y="1.5" />
//       </svg>
//     ),
//   },
// ];

// export function Features() {
//   return (
//     <motion.section
//       initial={{ opacity: 0, y: -100 }}
//       transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
//       viewport={{ once: true }}
//       whileInView={{ opacity: 1, y: 0 }}
//     >
//       <Container>
//         <Box
//           sx={{
//             bgcolor: 'var(--joy-palette-background-level1)',
//             borderRadius: 'var(--joy-radius-lg)',
//             position: 'relative',
//             px: 3,
//             py: '100px',
//           }}
//         >
//           <Box
//             sx={{
//               height: '100%',
//               left: 0,
//               overflow: 'hidden',
//               position: 'absolute',
//               py: '100px',
//               top: 0,
//               width: '100%',
//               zIndex: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 position: 'relative',
//                 overflow: 'hidden',
//                 height: '100%',
//                 width: '100%',
//                 '&:after': {
//                   background: 'linear-gradient(to top, var(--joy-palette-background-level1) 40%, transparent 100%)',
//                   content: '" "',
//                   height: '100%',
//                   left: 0,
//                   position: 'absolute',
//                   top: 0,
//                   width: '100%',
//                   zIndex: 2,
//                 },
//               }}
//             >
//               <Image
//                 alt="globe"
//                 height={493}
//                 src="/assets/globe.png"
//                 style={{
//                   position: 'absolute',
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   top: 0,
//                   zIndex: 1,
//                 }}
//                 width={1040}
//               />
//             </Box>
//           </Box>
//           <Stack spacing={6} sx={{ maxWidth: 'md', mx: 'auto', position: 'relative', zIndex: 2 }}>
//             <Stack spacing={2}>
//               <Typography color="primary" level="body-sm" textAlign="center">
//                 Features
//               </Typography>
//               <Typography level="h1" textAlign="center">
//                 Your one stop solution
//               </Typography>
//             </Stack>
//             <Grid container spacing={3}>
//               {features.map((feature, index) => (
//                 <Grid
//                   key={feature.id}
//                   md={6}
//                   sx={{
//                     '& > div': {
//                       height: '100%',
//                     },
//                   }}
//                   xs={12}
//                 >
//                   <FeatureCard delay={0.2 * index + 0.2} {...feature} />
//                 </Grid>
//               ))}
//             </Grid>
//           </Stack>
//         </Box>
//       </Container>
//     </motion.section>
//   );
// }

// function FeatureCard({ delay, description, icon, title }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.5 }}
//       transition={{ duration: 1, delay, ease: 'easeInOut' }}
//       viewport={{ once: true }}
//       whileInView={{ opacity: 1, scale: 1 }}
//     >
//       <Card sx={{ boxShadow: 'var(--joy-shadow-lg)', height: '100%', p: '6px' }}>
//         <Box
//           sx={{
//             alignItems: 'center',
//             border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
//             borderRadius: 'var(--joy-radius-md)',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 1,
//             height: '100%',
//             p: '24px',
//           }}
//         >
//           <span>{icon}</span>
//           <Typography level="h4" textAlign="center">
//             {title}
//           </Typography>
//           <Typography level="body-sm" textAlign="center">
//             {description}
//           </Typography>
//         </Box>
//       </Card>
//     </motion.div>
//   );
// }
