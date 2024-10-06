export class Account {
    constructor(
        public id: string,
        public name: string,
        public type: 'wellness' | 'health',
        public isActive: boolean
    ) {}
}