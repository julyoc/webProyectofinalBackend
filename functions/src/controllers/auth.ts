import { Router } from 'express';
import { auth as authenticate } from 'firebase-admin';


const authRouter = Router();
const auth = authenticate();

authRouter.route('/register').post((req, res) => {
    const data: UserSchema = req.body;
    auth.createUser({password: data.password, email: data.email}).then(value => {
        const { name, username, role } = data;
        auth.setCustomUserClaims(value.uid, {name, username, role}).then(() => {
            res.json({id: value.uid, massage: 'add new user'});
        }).catch(err => {throw err});
    }).catch(err => {throw err});
});

authRouter.route('/update').post((req, res) => {
    const data: UserSchema = req.body;
    auth.updateUser(data.uid, {email: data.email, password: data.password}).then(value => {
        const { name, username, role } = data;
        auth.setCustomUserClaims(data.uid, {name, username, role}).then(() => {
            res.json({id: value.uid, massage: 'user updated'});
        }).catch(err => {throw err});
    }).catch(err => {throw err});
});

authRouter.route('/authorizate').post((req, res) => {
    const { uid } = req.body;
    auth.getUser(uid).then((value: any) => {
        res.json({
            id: value.uid,
            massage: "is authorize",
            role: value.customClaims.role
        });
    }).catch(err => {
        res.json({id: null, role: null, massage: 'not authorize'})
    })
});

authRouter.route('/currentUser').get((req, res) => {
    const { user }: any = req.headers;
    let usr = JSON.parse(user);
    auth.getUser(usr.uid).then(value => {
        res.json(value);
    }).catch(err => {throw err})
});

authRouter.route('/users').get((req, res) => {
    auth.listUsers().then(value => {
        res.json(value.users);
    }).catch(err => {throw err});
});

authRouter.route('/user').get((req, res) => {
    const { id }: any = req.query;
    auth.getUser(id).then(value => {
        res.json(value);
    }).catch(err => {throw err});
});

authRouter.route('/user-by-email').get((req, res) => {
    const { email }: any = req.query;
    auth.getUserByEmail(email).then(value => {
        res.json(value);
    }).catch(err => {throw err});
});

export { authRouter };