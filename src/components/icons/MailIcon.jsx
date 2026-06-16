import mailPng from './mail.png';

export const MailIcon = ({ className = "w-6 h-6", style, ...props }) => (
  <img
    src={mailPng}
    alt="Gmail"
    className={className}
    style={{ objectFit: 'contain', ...style }}
    {...props}
  />
);
