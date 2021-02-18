import { FalseLiteral, LiteralExpression, NullLiteral, PrefixUnaryExpression, TrueLiteral } from 'ts-morph';

export type LiteralNode = NullLiteral | TrueLiteral | FalseLiteral | LiteralExpression | PrefixUnaryExpression;
