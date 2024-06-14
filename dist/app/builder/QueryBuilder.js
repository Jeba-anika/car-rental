"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        if (this.query.searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => {
                    var _a;
                    return ({
                        [field]: { $regex: (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm, $options: 'i' },
                    });
                }),
            });
        }
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const extractFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        extractFields.forEach((el) => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
}
exports.default = QueryBuilder;
