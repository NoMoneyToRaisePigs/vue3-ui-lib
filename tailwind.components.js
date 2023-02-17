const typographyMedia = '@media (max-width: 767.98px)'

const typographyComponents = {
  '.text-display1': {
    fontSize: '72px',
    lineHeight: '80px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    [typographyMedia]: {
      fontSize: '48px',
      lineHeight: '56px',
    },
  },
  '.text-display2': {
    fontSize: '48px',
    lineHeight: '56px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    [typographyMedia]: {
      fontSize: '40px',
      lineHeight: '48px',
    },
  },
  '.text-h1, h1': {
    fontSize: '40px',
    lineHeight: '48px',
    fontWeight: '600',
    [typographyMedia]: {
      fontSize: '32px',
      lineHeight: '40px',
    },
  },
  '.text-h2, h2': {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: '600',
    [typographyMedia]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  '.text-h3, h3': {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '600',
    [typographyMedia]: {
      fontSize: '20px',
      lineHeight: '24px',
    },
  },
  '.text-h4, h4': {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: '600',
    [typographyMedia]: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
  '.text-subhead1': {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '600',
    [typographyMedia]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  '.text-subhead2': {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '600',
    [typographyMedia]: {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  '.text-subhead3': {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '600',
    [typographyMedia]: {
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
  '.text-overline': {
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '2px',
    fontWeight: '600',
    [typographyMedia]: {
      fontSize: '10px',
      lineHeight: '14px',
    },
  },
  '.text-caption1': {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '500',
  },
  '.text-caption2': {
    fontSize: '10px',
    lineHeight: '14px',
    fontWeight: '500',
  },
  '.text-body1': {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '500',
  },
  '.text-body2': {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '500',
  },
}

module.exports = {
  ...typographyComponents,
}
