import { Router } from 'express';
import { firestore } from 'firebase-admin';

const subcategRouter = Router();

const db = firestore().collection('categ');
subcategRouter.route('/:categ').get((req, res) => {
    const { categ } = req.params;
    const { id }:any = req.query;
    if (id) db.doc(categ).collection('subcateg').doc(id).get().then(value => {
        const data = value.data();
        res.json({id: value.id, ...data});
    }).catch(err => {throw err});
    db.doc(categ).collection('subcateg').get().then(value => {
        const dat = value.docs.map(elem => {
            const data = elem.data();
            return {id: elem.id, ...data}
        });
        res.json(dat);
    }).catch(err => {throw err});
}).post((req, res) => {
    const { categ } = req.params;
    const data: CategoriesSchema = req.body;
    db.doc(categ).collection('subcateg').add(data).then(value => {
        res.json({id: value.id, massage: 'add new document'});
    }).catch(err => {throw err});
}).put((req, res) => {
    const { categ } = req.params;
    const { id }:any = req.query;
    const data: CategoriesSchema = req.body;
    db.doc(categ).collection('subcateg').doc(id).update(data).then(value => {
        res.json({id, massage: 'document updated'});
    }).catch(err => {throw err});
}).delete((req, res) => {
    const { categ } = req.params;
    const { id }:any = req.query;
    db.doc(categ).collection('subcateg').doc(id).delete().then(value => {
        res.json({id, massage: 'deleted document'});
    })
});

subcategRouter.route('/:categ/length').get((req, res) => {
    const { categ } = req.params;
    db.doc(categ).collection('subcateg').get().then(value => {
        res.send({len: value.size});
    }).catch(err => {throw err});
});

subcategRouter.route('/:categ/:size/:page').get((req, res) => {
    const { categ } = req.params;
    const { size, page }: any = req.params;
    db.doc(categ).collection('subcateg').get().then(value => {
        value.query.offset(size*(page-1)).limit(Number(size)).get().then(value => {
            const dat = value.docs.map(elem => {
                const data = elem.data();
                return {id: elem.id, ...data}
            });
            res.json(dat);
        }).catch(err => {throw err});
    }).catch(err => {throw err});
});
export { subcategRouter };