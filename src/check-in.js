const $ = document.querySelector.bind(document)

const name$ = $('.name-input')
const nameError$ = $('.name-box .errorable-input')
const email$ = $('.email-input')
const emailError$ = $('.email-box .errorable-input')
const checkbox$ = $('.waiver-input')
const checkboxLabel$ = $('.waiver-box label')
const checkboxError$ = $('.waiver-box .errorable-input')
const thankYou$ = $('.thank-you')
const thankYouMsg$ = $('.thank-you-msg')
const submit$ = $('.submit-input')

const emailRegex = /(?!.*\.\.)(^[^\.][^@\s]+@[^@\s]+\.[^@\s\.]+$)/

submit$.addEventListener('click', submit)

name$.addEventListener('keypress', async e => {
  // prefill their email if we've seen the first and last name before
  const [first, last] = parseName(e.target.value + e.key)
  if (first && last) {
    const emailMatch = await findEmailFromName(first, last)
    if (emailMatch) email$.value = emailMatch.email
  }

  if (e.which === 13) {
    email$.focus()
    validateName()
  }
})

email$.addEventListener('keypress', e => {
  if (e.which === 13) {
    submit()
  }

  if ($('.email-box .has-error')) {
    validateEmail()
  }
})

// toggle the checkbox when enter is pressed
checkbox$.addEventListener('keypress', e => {
  if (e.which === 13) {
    e.target.checked = !e.target.checked
  }
  validateWaiver()
})

// validate waiver on click for fast-feedback
checkbox$.addEventListener('click', validateWaiver)

// validate if we move to another field
name$.addEventListener('focusout', validateName)
email$.addEventListener('focusout', validateEmail)
checkbox$.addEventListener('focusout', validateWaiver)

// Attempt to 'submit' the user by adding their information to some local list
function submit() {
  const isValid = validateFields()

  if (isValid) {
    const now = Date.now()
    const [firstName, lastName] = parseName(name$.value)
    const studentRegistration = {
      firstName,
      lastName,
      email: email$.value,
      agreeToWaiver: checkbox$.checked,
      timestamp: now,
      sentViaEmail: false,
    }

    // add to firebase
    fDb
      .collection('students')
      .doc(String(now))
      .set(studentRegistration)
      .then(
        d => console.log('saved student to fDb'),
        e => console.log('failed to add student to fDb')
      )

    flashThankYou(firstName)
    resetForm()
  }
}

function flashThankYou(name) {
  thankYouMsg$.textContent = `Thank you, ${name}!`
  thankYou$.classList.remove('hide')
  thankYou$.classList.add('fade-in')
  setTimeout(() => {
    thankYou$.classList.remove('fade-in')
    thankYou$.classList.add('fade-out')
    setTimeout(() => {
      thankYou$.classList.remove('fade-out')
      thankYou$.classList.add('hide')
    }, 1500)
  }, 1500)
}

function resetForm() {
  // reset focus
  name$.focus()

  // reset values
  name$.value = ''
  email$.value = ''

  // reset errors
  clearError(emailError$)
  clearError(nameError$)
  $('.name-error').hidden = true
}

// run all validations, accumulate a sum isValid
function validateFields() {
  let isValid = validateName()
  isValid = validateEmail() && isValid
  isValid = validateWaiver() && isValid
  return isValid
}

function validateEmail() {
  if (!emailRegex.test(email$.value)) {
    displayError(emailError$)
  } else {
    clearError(emailError$)
    return true
  }
}

function validateName() {
  const [first, ...last] = name$.value.split(' ')
  if (!first.length || !last.length) {
    displayError(nameError$)
    $('.name-error').hidden = false
  } else {
    clearError(nameError$)
    $('.name-error').hidden = true
    return true
  }
}

function validateWaiver() {
  if (!checkbox$.checked) {
    displayError(checkboxError$)
  } else {
    clearError(checkboxError$)
    return true
  }
}

function displayError(el$) {
  el$.classList.add('has-error')
}

function clearError(el$) {
  el$.classList.remove('has-error')
}

// turn a name-like string into a capitalized [first, last] tuple
function parseName(nameString) {
  const names = nameString.split(' ')
  const firstName = names.slice(0, -1).join(' ')
  const lastName = names.slice(-1).join(' ')
  return [capitalize(firstName), capitalize(lastName)]
}

function capitalize(string) {
  if (string.length === 0) return string
  return string
    .split(' ')
    .map(name => name[0].toUpperCase() + name.slice(1).toLowerCase())
    .join(' ')
}

/*******
 *
 *******
 *
 *      irebase  */

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCCpWsrS-FO4q48gxqxmP10735GJk3SV4o',
  authDomain: 'anniehayeswellness-221818.firebaseapp.com',
  databaseURL: 'https://anniehayeswellness-221818.firebaseio.com',
  projectId: 'anniehayeswellness-221818',
  storageBucket: 'anniehayeswellness-221818.appspot.com',
  messagingSenderId: '1026415276139',
}
window.firebase.initializeApp(firebaseConfig)

// Initialize Cloud Firestore through Firebase
const fDb = firebase.firestore()

// Disable deprecated features
fDb.settings({
  timestampsInSnapshots: true,
})

// Enable some offline redundancy
// fDb.enablePersistence()

window.firebase
  .auth()
  .signInAnonymously()
  .catch(error => {
    console.error('Hey! Error signing in to firebase anonymously:', error)
    alert(`Hey!

We had a problem starting up. Can you refresh or turn off your adblocker for this page?

If that doesn't fix it: ignore this message, keep using the site, and let Jonathan know :)`)
  })

function findEmailFromName(first, last) {
  return fDb
    .collection('students')
    .where('firstName', '==', first)
    .where('lastName', '==', last)
    .limit(1)
    .get()
    .then(d => {
      if (d.docs.length) {
        let data
        d.forEach(entry => (data = entry.data()))
        return data
      }
    })
}
