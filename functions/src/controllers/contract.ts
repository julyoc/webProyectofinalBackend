import { Router } from 'express';
import { firestore } from 'firebase-admin';

const contractRouter = Router();

const db = firestore().collection('contract');
contractRouter.route('/').get((req, res) => {
    const { id }:any = req.query;
    if (id) db.doc(id).get().then(value => {
        const data = value.data();
        res.json({id: value.id, ...data});
    }).catch(err => {throw err});
    db.get().then(value => {
        const dat = value.docs.map(elem => {
            const data = elem.data();
            return {id: elem.id, ...data}
        });
        res.json(dat);
    }).catch(err => {throw err});
}).post((req, res) => {
    const data: ContractSchema = req.body;
    db.add(data).then(value => {
        res.json({id: value.id, massage: 'add new document'});
    }).catch(err => {throw err});
}).put((req, res) => {
    const { id }:any = req.query;
    const data: ContractSchema = req.body;
    db.doc(id).update(data).then(value => {
        res.json({id, massage: 'document updated'});
    }).catch(err => {throw err});
}).delete((req, res) => {
    const { id }:any = req.query;
    db.doc(id).delete().then(value => {
        res.json({id, massage: 'deleted document'});
    })
});

contractRouter.route('/length').get((req, res) => {
    db.get().then(value => {
        res.send({len: value.size});
    }).catch(err => {throw err});
});

contractRouter.route('/:size/:page').get((req, res) => {
    const { size, page }: any = req.params;
    db.get().then(value => {
        value.query.offset(size*(page-1)).limit(Number(size)).get().then(value => {
            const dat = value.docs.map(elem => {
                const data = elem.data();
                return {id: elem.id, ...data}
            });
            res.json(dat);
        }).catch(err => {throw err});
    }).catch(err => {throw err});
});


export { contractRouter };