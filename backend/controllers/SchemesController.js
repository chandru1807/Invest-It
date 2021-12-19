const schemesService = require('../service/SchemesService')

class SchemesController {
    async schemeById(req,res){
        const id = req.params.id
        const schemeData = await schemesService.getSchemeById(id);
        res.send(schemeData);
    }

    async schemesByType(req,res){
        const schemeType = req.params.type;
        const limit = req.query.limit;
        const offset = req.query.offset;
        const schemeData = await schemesService.getSchemesByType(schemeType, limit, offset);
        res.send(schemeData);
    }
}

module.exports = new SchemesController();