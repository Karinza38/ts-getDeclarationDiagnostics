import ts55 from "typescript-5-5";
import ts57 from "typescript-5-7";

runBenchmark(ts55);
runBenchmark(ts57);

function runBenchmark(ts) {
  const options = {
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    rootDir: "./projects/my-lib/src",
  };

  const createProgramOptions = {
    rootNames: ["./projects/my-lib/src/index.ts"],
    options,
  };

  console.log("\nTypeScript Version: " + ts.version);
  {
    const host = ts.createIncrementalCompilerHost(options);
    const typeScriptProgram = ts.createProgram({
      ...createProgramOptions,
      host,
    });
    const builder = ts.createEmitAndSemanticDiagnosticsBuilderProgram(
      typeScriptProgram,
      host
    );

    console.time("builder.getDeclarationDiagnostics()");
    builder.getDeclarationDiagnostics();
    console.timeEnd("builder.getDeclarationDiagnostics()");
  }

  {
    const host = ts.createIncrementalCompilerHost(options);
    const typeScriptProgram = ts.createProgram({
      ...createProgramOptions,
      host,
    });
    const builder = ts.createEmitAndSemanticDiagnosticsBuilderProgram(
      typeScriptProgram,
      host
    );
    console.time(
      "builder.getDeclarationDiagnostics(builder.getSourceFiles()[0])"
    );
    builder.getDeclarationDiagnostics(builder.getSourceFiles()[0]);
    console.timeEnd(
      "builder.getDeclarationDiagnostics(builder.getSourceFiles()[0])"
    );
  }

  {
    const host = ts.createIncrementalCompilerHost(options);
    const typeScriptProgram = ts.createProgram({
      ...createProgramOptions,
      host,
    });
    const builder = ts.createEmitAndSemanticDiagnosticsBuilderProgram(
      typeScriptProgram,
      host
    );
    console.time(
      "builder.getSourceFiles().forEach(sf => builder.getDeclarationDiagnostics(sf))"
    );
    builder
      .getSourceFiles()
      .forEach((sf) => builder.getDeclarationDiagnostics(sf));
    console.timeEnd(
      "builder.getSourceFiles().forEach(sf => builder.getDeclarationDiagnostics(sf))"
    );
  }
}
