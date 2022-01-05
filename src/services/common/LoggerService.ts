export class LoggerService {
    private output: Function = console.log;

    private writeLog = (message: string, className: string, data?: any): void => {
        let errorOutput = data !== undefined ? data : {}

        if(errorOutput instanceof Error) {
            errorOutput = `Error message: ${errorOutput.message}; Stack ${errorOutput.stack}`
        } else {
            try {
                errorOutput = JSON.stringify(errorOutput)
            } catch (error) {
                errorOutput = 'Unable to serialize error data'
            }
        }
        
        const outObject = {
            message: message,
            error: errorOutput,
            date: new Date().toISOString(),
            local: className
        }

        let outstring: string
        try {
            outstring = JSON.stringify(outObject)
        } catch (error) {
            outstring = `{"level":"error","message":"Error trying to serialize for logs; ${error}"}`
        }

        this.output(outstring)
    }

    trace = ( message: string, className: string ): void => {
        this.writeLog(message, className)
    }

    error = ( message: string, data: any, className: string ): void => {
        this.writeLog(message, className, data)
    }
}