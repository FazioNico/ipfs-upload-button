export const toastStyle = `
/* Toast Element */
#ipfsToast {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: lightblue; /* Background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 8px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  line-hight: 12px;
}
#ipfsToast.success {
  background-color: green; /* Fallback Background color */
  background-color: lightgreen; /* Fallback Background color */
  background-color: springgreen; /* Background color */
}
#ipfsToast.error {
  background-color: red; /* Fallback Background color */
  background-color: indianred; /* Background color */
}
#ipfsToast span {
  margin-left: 12px;
  margin-top: 2px;
}

/* Show the SIMPLE-TOAST when clicking on a button (class added with JavaScript) */
#ipfsToast.show {
  visibility: visible; /* Show the SIMPLE-TOAST */
  /* Add animation: Take 0.5 seconds to fade in and out the SIMPLE-TOAST.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the SIMPLE-TOAST in and out */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
`;