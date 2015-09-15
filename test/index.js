var tape = require("tape"),
    hashCode = require("..");


tape("hashCode(value: Any) should return hash code for value", function(assert) {
    assert.equals(hashCode(0), 0);
    assert.equals(hashCode("string"), -891985903);
    assert.equals(hashCode({}), 2);
    assert.equals(hashCode([]), 3);
    assert.end();
});
