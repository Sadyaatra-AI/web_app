export default async function handler(req: any, res: any) {
    try {
        console.log('API FUNCTION START');

        const module = await import('../server');

        console.log('SERVER MODULE IMPORTED');

        const app = module.default;

        return app(req, res);
    } catch (error: any) {
        console.error('SERVER IMPORT/INVOCATION FAILED');
        console.error(error);

        return res.status(500).json({
            error: 'Server initialization failed',
            name: error?.name,
            message: error?.message,
            stack: error?.stack,
        });
    }
}