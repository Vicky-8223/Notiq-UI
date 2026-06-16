import kafkaPng from './kafka.png';

export const KafkaIcon = ({ className = "w-6 h-6", style, ...props }) => (
  <img
    src={kafkaPng}
    alt="Kafka"
    className={className}
    style={{ objectFit: 'contain', ...style }}
    {...props}
  />
);
