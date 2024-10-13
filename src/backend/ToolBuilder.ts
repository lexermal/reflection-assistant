import { z } from 'zod';

type BasicType = string | number | boolean;

class ToolBuilder {

  tools = {} as any;

  public addClientTool(name: string, description = "") {
    let parameters = z.object({});

    const builder = {
      addParameter: (name: string, type: BasicType, description: string) => {
        parameters = parameters.extend({
          [name]: this.buildParameter(type, description)
        });
        return builder;
      },
      build: () => {
        this.tools[name] = {
          description,
          parameters
        }
      }
    }
    return builder;
  }

  public addUserInteractionTool(name: string, description = "") {
    return this.addClientTool(name, description);
  }

  public addServerTool(name: string, description = "") {
    let parameters = z.object({});

    const builder = {
      addParameter: (name: string, type: BasicType, description: string) => {
        parameters = parameters.extend({
          [name]: this.buildParameter(type, description)
        });
        return builder;
      },
      build: <T, W>(fn: (params: T) => Promise<W>) => {
        this.tools[name] = {
          description,
          parameters,
          execute: fn,
        }
      }
    }
    return builder;
  }

  private buildParameter(type: BasicType, description: string) {
    if (typeof type === 'string') {
      return z.string().describe(description);
    } else if (typeof type === 'number') {
      return z.number().describe(description);
    } else if (typeof type === 'boolean') {
      return z.boolean().describe(description);
    }
    return z.object({}).describe(description);
  }

  getTools() {
    return this.tools;
  }

}

export default ToolBuilder;