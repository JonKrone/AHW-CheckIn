;(this['webpackJsonpahw-check-in'] =
  this['webpackJsonpahw-check-in'] || []).push([
  [0],
  {
    11: function(e, a, t) {
      e.exports = t(25)
    },
    16: function(e, a, t) {},
    17: function(e, a, t) {},
    25: function(e, a, t) {
      'use strict'
      t.r(a)
      var n = t(0),
        s = t.n(n),
        i = t(10),
        r = t.n(i),
        o = (t(16), t(2)),
        l =
          (t(17),
          t(18),
          {
            teachers: ['Cassie', 'McKenzie', 'Joe', 'Lauren'],
            classes: [
              'Utepils',
              'La Dona',
              'Dangerous Man',
              'Number 12 Cidery',
              'Workshop',
            ],
          }),
        c = function(e) {
          var a = e.onSubmit,
            t = Object(n.useState)(),
            i = Object(o.a)(t, 2),
            r = i[0],
            c = i[1],
            m = Object(n.useState)(),
            u = Object(o.a)(m, 2),
            h = u[0],
            d = u[1],
            y = Object(n.useState)(),
            p = Object(o.a)(y, 2),
            g = p[0],
            f = p[1],
            b = 'Workshop' === h,
            v = b ? 'Workshop - '.concat(g) : h,
            w = Boolean(r && b ? g : h)
          return s.a.createElement(
            'div',
            { className: 'flex w-100 vh-50 justify-center items-center' },
            s.a.createElement(
              'div',
              { className: 'flex flex-column w-20 items-center' },
              s.a.createElement(
                'div',
                { className: 'flex w-100 justify-between pb4' },
                s.a.createElement('label', { htmlFor: 'teacher' }, 'Teacher'),
                s.a.createElement(
                  'select',
                  {
                    id: 'teacher',
                    value: r,
                    onChange: function(e) {
                      return c(e.target.value)
                    },
                  },
                  s.a.createElement('option', { value: void 0 }, 'None'),
                  l.teachers.map(function(e) {
                    return s.a.createElement('option', { key: e, value: e }, e)
                  })
                )
              ),
              s.a.createElement(
                'div',
                { className: 'flex w-100 flex-column pb4' },
                s.a.createElement(
                  'div',
                  { className: 'flex w-100 justify-between pb2' },
                  s.a.createElement(
                    'label',
                    { htmlFor: 'location' },
                    'Location'
                  ),
                  s.a.createElement(
                    'select',
                    {
                      id: 'location',
                      value: h,
                      onChange: function(e) {
                        return d(e.target.value)
                      },
                    },
                    s.a.createElement('option', { value: void 0 }, 'None'),
                    l.classes.map(function(e) {
                      return s.a.createElement(
                        'option',
                        { key: e, value: e },
                        e
                      )
                    })
                  )
                ),
                b &&
                  s.a.createElement('input', {
                    className: 'ml-auto w-60',
                    type: 'text',
                    placeholder: 'Workshop Name',
                    value: g || '',
                    onChange: function(e) {
                      return f(e.target.value)
                    },
                  })
              ),
              s.a.createElement(
                'button',
                {
                  className: 'w-50',
                  disabled: !w,
                  onClick: function(e) {
                    return a({ location: v, teacher: r })
                  },
                },
                'Next'
              )
            )
          )
        },
        m = t(3)
      t(19), t(21)
      m.initializeApp({
        apiKey: 'AIzaSyCCpWsrS-FO4q48gxqxmP10735GJk3SV4o',
        authDomain: 'anniehayeswellness-221818.firebaseapp.com',
        databaseURL: 'https://anniehayeswellness-221818.firebaseio.com',
        projectId: 'anniehayeswellness-221818',
        storageBucket: 'anniehayeswellness-221818.appspot.com',
        messagingSenderId: '1026415276139',
      })
      m.firestore()
      m.auth()
        .signInAnonymously()
        .catch(function(e) {
          console.error('Hey! Error signing in to firebase anonymously:', e),
            alert(
              "Hey!\n\nWe had a problem starting up. Can you refresh or turn off your adblocker for this page?\n\nIf that doesn't fix it: ignore this message, keep using the site, and let Jonathan know :)"
            )
        })
      var u = function() {
          return s.a.createElement('textarea', {
            className:
              'vh-25 w-100 lh-title bg-light-gray ba b--light-gray br1 pa2',
            style: { resize: 'none' },
            readOnly: !0,
            value:
              'YOGA TEACHER AND LOCATION LIABILITY STUDENT WAIVER AGREEMENT\n      I, the person registering above, understand that yoga includes physical movements as well as an opportunity for relaxation, stress re\xadeducation and relief of muscular tension. Participation in yoga class includes, but is not limited to, participation in meditation techniques, yogic breathing techniques, and performing various yoga postures. Yoga postures, or asanas, are designed to exercise every part of the body\u2015stretching and toning the muscles and joints, the spine and the entire skeletal system. They also work on the internal organs, glands and nerves. Yoga incorporates sustained stretching to strengthen muscles and increase flexibility. Yoga is an individual experience.\n      As is the case with any physical activity, the risk of injury, even serious or disabling, is always present and cannot be entirely eliminated. My signature acknowledges I understand that in yoga class I will progress at my own pace. If I experience any pain or discomfort, I will listen to my body, adjust the posture and ask for support from the yoga teacher (the \u201cTeacher\u201d). I will continue to breathe smoothly. If at any point I feel overexertion or fatigue, I will respect my body\u2019s limitations and I will rest before continuing yoga practice.\n      Yoga is not a substitute for medical attention, examination, diagnosis or treatment. Yoga is not recommended and is not safe under certain medical conditions. I affirm that I alone am responsible to decide whether to practice yoga.\n      By signing my name below, I acknowledge that participation in yoga classes exposes me to a possible risk of personal injury. I am fully aware of this risk. I hereby consent to receive medical treatment that may be deemed advisable in the event of injury, accident and/or illness during any yoga class.\n      I hereby take action for myself, my executors, administrators, heirs, next of kin, successors and assigns as follows: I (a) irrevocably WAIVE, RELEASE AND DISCHARGE FROM ANY AND ALL LIABILITY for my death, disability, personal injury, property damage, property theft or actions of any kind which hereafter may occur to me, including my traveling to and from yoga classes, Annie Hayes Wellness, Anne Krohn, or any other yoga teacher teaching for AHW, and yoga class location, who is hosting these classes and where sessions are being held, and each of their directors, officers, employees, volunteers, representatives and agents; and (b) INDEMNIFY, HOLD HARMLESS AND AGREE NOT TO SUE the entities or persons mentioned in this paragraph as to any and all liabilities or claims made as a result of participation in the yoga classes, whether caused by the negligence of releasees or otherwise.\n      My signature further acknowledges that I shall not now or at any time in the future bring any legal action against Teacher and/or yoga class location and that this waiver is binding on me, my heirs, my spouse, my children, my legal representatives, my successors and my assigns. My signature verifies that I am physically fit to participate in yoga classes and a licensed medical doctor has verified my physical condition for participation in this type of class.\n      If I am pregnant or become pregnant or am post\xadnatal, my signature verifies that I am participating in yoga classes with my doctor\u2019s full approval. I realize that I am participating in yoga classes at my own risk.\n      The Student Waiver Agreement shall be construed broadly to provide a release and waiver to the maximum extent permissible under applicable law. I acknowledge that this Student Waiver Agreement form will be used by the persons or entities being released in the yoga classes and that it will govern my actions and responsibilities in said classes.\n      I hereby certify that I have read this document; and, I understand its content. I am aware that this is a release of liability as well as a contract and I sign it of my own free will.',
          })
        },
        h = /(?!.*\.\.)(^[^\.][^@\s]+@[^@\s]+\.[^@\s\.]+$)/,
        d = function(e) {
          e.meta
          var a = Object(n.useState)(''),
            t = Object(o.a)(a, 2),
            i = t[0],
            r = t[1],
            l = Object(n.useState)(!0),
            c = Object(o.a)(l, 2),
            m = c[0],
            d = c[1],
            y = h.test(i) && m
          return s.a.createElement(
            'div',
            { className: 'flex flex-column items-center w-100' },
            s.a.createElement(
              'div',
              { className: 'hide thank-you-tmp' },
              s.a.createElement('h3', { className: 'thank-you-msg' })
            ),
            s.a.createElement(
              'div',
              { className: 'email-box' },
              s.a.createElement(
                'div',
                { className: 'errorable-input' },
                s.a.createElement('input', {
                  className: 'email-input errorable',
                  type: 'text',
                  name: 'Email',
                  placeholder: 'Email',
                  value: i,
                  onChange: function(e) {
                    return r(e.target.value)
                  },
                })
              )
            ),
            s.a.createElement(
              'div',
              { className: 'waiver-box' },
              s.a.createElement(
                'div',
                { className: 'errorable-input' },
                s.a.createElement(
                  'label',
                  { className: 'errorable' },
                  s.a.createElement('input', {
                    type: 'checkbox',
                    className: 'waiver-input',
                    checked: m,
                    onChange: function(e) {
                      return d(e.target.checked)
                    },
                  }),
                  "I Promise I won't sue if I hurt myself"
                )
              )
            ),
            s.a.createElement(
              'div',
              { className: 'submit-box' },
              s.a.createElement(
                'button',
                { disabled: y, className: 'submit-input' },
                'Register'
              )
            ),
            s.a.createElement(u, null)
          )
        },
        y = function() {
          var e = Object(n.useState)({ teacher: 'Jon', location: 'Bennys' }),
            a = Object(o.a)(e, 2),
            t = a[0],
            i = a[1]
          return s.a.createElement(
            s.a.Fragment,
            null,
            t
              ? s.a.createElement(d, { meta: t })
              : s.a.createElement(c, {
                  onSubmit: function(e) {
                    return i(e)
                  },
                })
          )
        }
      r.a.render(
        s.a.createElement(y, null),
        document.getElementById('check-in-app')
      )

      console.log('rendering')
    },
  },
  [[11, 1, 2]],
])
//# sourceMappingURL=main.3717e642.chunk.js.map
