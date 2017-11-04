var Benchmark = require("benchmark"),
    ImmutableJSHash = require("immutable").hash,
    hashCode = require("..");


var suite = new Benchmark.Suite();



suite.add("hash code", function() {
    hashCode("string");
    hashCode(123456789);
    hashCode({});
    hashCode([]);
    hashCode(true);
    hashCode(false);
    hashCode(null);
    hashCode(undefined);
});

suite.add("ImmutableJS hash code", function() {
    ImmutableJSHash("string");
    ImmutableJSHash(123456789);
    ImmutableJSHash({});
    ImmutableJSHash([]);
    ImmutableJSHash(true);
    ImmutableJSHash(false);
    ImmutableJSHash(null);
    ImmutableJSHash(undefined);
});

suite.on("cycle", function(event) {
    console.log(String(event.target));
});

suite.on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
    console.log("==========================================\n");
});

console.log("\n= Hash Code ================================");
suite.run();
