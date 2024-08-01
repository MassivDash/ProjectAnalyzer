export const displayHelpIntoConsole = () => {
  console.log(`
    Usage: projectAnalyzer [options]
    
    Options:
        -h, --help            display help for command
        -p, --path <path>     specify the path to the directory to analyze
        -o, --output <output> specify the output file name
        -m, --markdown        output the results in markdown format
        -s, --silent          do not output the results to the console
        -t, --tree            output folder structure as a tree
    `);
};
