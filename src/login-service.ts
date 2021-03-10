import { Configuration, PublicClientApplication } from '@azure/msal-browser';

import { CommonSettings } from './common-settings';
import { getLogger } from './logger';

const logger = getLogger('login-service');

const SCOPES = ['openid'];
const AUTHORITY = `https://${CommonSettings.b2cName}.b2clogin.com/${CommonSettings.b2cName}.onmicrosoft.com/`;
const SIGN_IN_POLICY = CommonSettings.b2cSignUpSignInGlobalPolicy;

const msalConfig: Configuration = {
	auth: {
		clientId: CommonSettings.b2cClientId,
		authority: `${AUTHORITY}${SIGN_IN_POLICY}`,
		knownAuthorities: [`${CommonSettings.b2cName}.b2clogin.com`],
		redirectUri: CommonSettings.b2cRedirectUrl,
		postLogoutRedirectUri: CommonSettings.b2cRedirectUrl,
	},
	cache: {
		cacheLocation: 'localStorage',
		storeAuthStateInCookie: false,
	},
};

const msalAgent = new PublicClientApplication(msalConfig);

msalAgent
	.handleRedirectPromise()
	.then((tokenResponse) => {
		try {
			logger.debug('tokenResponse', tokenResponse);
			logger.debug('all accounts ', msalAgent.getAllAccounts());
			logger.debug('active account', msalAgent.getActiveAccount());
		} catch (error) {
			logger.error('handleRedirectPromise ', error);
		}
	})
	.catch((error) => logger.error('Constructor Error', error));

export class LoginService {
	private msalAgent: PublicClientApplication = msalAgent;
	private _accessToken?: string;

	async login(): Promise<boolean> {
		await this.openLogin();

		return !!this._accessToken;
	}

	get userData() {
		if (this.msalAgent.getAllAccounts()?.length > 0) {
			return this.msalAgent.getAllAccounts()[0];
		} else {
			return null;
		}
	}

	logout() {
		this.msalAgent.logout();
	}

	private async openLogin() {
		try {
			logger.debug('Redirect to login page');

			await this.msalAgent.loginRedirect({
				authority: `${AUTHORITY}${SIGN_IN_POLICY}`,
				scopes: SCOPES,
				prompt: 'login',
			});
		} catch (error) {
			logger.error('open login', error);
		}
	}
}
