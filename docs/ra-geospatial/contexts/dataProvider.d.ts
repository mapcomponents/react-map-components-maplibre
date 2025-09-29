export declare const defaultData: {
    pois: {
        id: number;
        title: string;
        geom: string;
    }[];
    properties: {
        id: number;
        title: string;
        geom: string;
    }[];
    routes: {
        id: number;
        title: string;
        geom: string;
    }[];
};
export declare const dataProvider: {
    getList: (resource: any, params: any) => Promise<import('react-admin').GetListResult<any> | {
        data: never[];
        total: number;
    }>;
    getOne: (resource: any, params: any) => Promise<import('react-admin').GetOneResult<any>>;
    getMany: (resource: any, params: any) => Promise<import('react-admin').GetManyResult<any>>;
    getManyReference: (resource: any, params: any) => Promise<import('react-admin').GetManyReferenceResult<any> | {
        data: never[];
        total: number;
    }>;
    update: (resource: any, params: any) => Promise<import('react-admin').UpdateResult<any>>;
    updateMany: (resource: any, params: any) => Promise<import('react-admin').UpdateManyResult<any>>;
    create: (resource: any, params: any) => Promise<import('react-admin').CreateResult<any>>;
    delete: (resource: any, params: any) => Promise<import('react-admin').DeleteResult<any>>;
    deleteMany: (resource: any, params: any) => Promise<import('react-admin').DeleteManyResult<any>>;
};
//# sourceMappingURL=dataProvider.d.ts.map