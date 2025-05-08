import passport from 'passport';
import { User } from '../interfaces/user';

// Mock user database
const users: User[] = [{ id: 1, username: 'username', password: 'password' }];

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
    const user = users.find((user) => id === user.id);
    done(null, user || false);
});

export default passport;
