# Authentication with Amplify

## Create UI login

Amplify Framework has an [authentication UI component](https://ui.docs.amplify.aws/components/authenticator?platform=angular) we can use that will provide the entire authentication flow for us, using our configuration specified in our `aws-exports.js` file.

Add the `amplify-authenticator` component to the top of `src/app/app.component.html`.

```html
<amplify-authenticator>
  <ng-template
    amplifySlot="authenticated"
    let-user="user"
    let-signOut="signOut"
  >
    <h1>Welcome {{ user.username }}!</h1>
    <button (click)="signOut()">Sign Out</button>
  </ng-template>
</amplify-authenticator>
```

## Furthermore
