export class FirebaseErrors {
    static Parse(errorCode: string): string {

      let message: string;

      switch (errorCode) {
        case 'auth/wrong-password':
          message = 'firebase_errors.wrong_password';
          break;
        case 'auth/network-request-failed':
          message = 'firebase_errors.network_request_failed';
          break;
        case 'auth/too-many-requests':
          message = 'firebase_errors.too_many_requests';
          break;
        case 'auth/user-disabled':
          message = 'firebase_errors.user_disabled';
          break;
        case 'auth/requires-recent-login':
          message = 'firebase_errors.requires_recent_login';
          break;
        case 'auth/email-already-exists':
          message = 'firebase_errors.email_already_exists';
          break;
        case 'auth/email-already-in-use':
          message = 'firebase_errors.email_already_in_use';
          break;
        case 'auth/user-not-found':
          message = 'firebase_errors.user_not_found';
          break;
        case 'auth/phone-number-already-exists':
          message = 'firebase_errors.phone_number_already_exists';
          break;
        case 'auth/invalid-phone-number':
          message = 'firebase_errors.invalid_phone_number';
          break;
        case 'auth/invalid-email  ':
          message = 'firebase_errors.invalid_email';
          break;
        case 'auth/invalid-action-code':
          message = 'firebase_errors.invalid_action_code';
          break;
        case 'auth/cannot-delete-own-user-account':
          message = 'firebase_errors.cannot_delete_own_user_account';
          break;
        case 'auth/weak-password':
          message  = 'Password should be at least 6 characters';
          break;
        default:
          message = 'Oops! Something went wrong. Try again later.';
          break;
      }

      return message;
    }
  }
