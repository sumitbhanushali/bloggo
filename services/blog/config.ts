export default {
    port: {
      doc: 'The API listening port. By default is 0 (ephemeral) which serves as a dynamic port for testing purposes. For production use, a specific port must be assigned',
      format: 'Number',
      default: 3000,
      nullable: true,
      env: 'PORT',
    },
    logger: {
      prettyPrint: {
        doc: 'Weather the logger should be configured to pretty print the output',
        format: 'Boolean',
        default: true,
        nullable: false,
        env: 'PRETTY_PRINT_LOG',
      },
    },
  };
  