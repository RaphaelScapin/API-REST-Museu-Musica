const { body, param } = require('express-validator');

function validarEmail() {
    return body('email')
        .isString()
        .bail()
        .trim()
        .isLength({ max: 254 })
        .isEmail()
        .withMessage('Informe um e-mail valido')
        .bail()
        .toLowerCase();
}

function validarSenha(opcional = false) {
    const regra = body('senha');
    if (opcional) regra.optional();
    return regra.isString()
        .withMessage('Informe uma senha em texto')
        .bail()
        .isLength({ min: 8 })
        .withMessage('A senha deve ter pelo menos 8 caracteres')
        .bail()
        .custom((senha) => Buffer.byteLength(senha, 'utf8') <= 72)
        .withMessage('A senha deve ter no maximo 72 bytes');
}

const validarLogin = [validarEmail(), validarSenha()];
const validarCriacaoUsuario = [
    validarEmail(), validarSenha(),
    body('status')
        .optional()
        .isIn(['ativo', 'inativo'])
        .withMessage('Use ativo ou inativo')
];
const validarAtualizacaoUsuario = [
    validarEmail(), validarSenha(true),
    body('status')
        .isIn(['ativo', 'inativo'])
        .withMessage('Use ativo ou inativo')
];
const validarIdUsuario = [param('id').isUUID().withMessage('Informe um UUID valido')];

module.exports = { validarLogin, validarCriacaoUsuario, validarAtualizacaoUsuario, validarIdUsuario };