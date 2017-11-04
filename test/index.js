var tape = require("tape"),
    hashCode = require("..");


tape("hashCode(value: Any) should return hash code for value", function(assert) {
    assert.equals(hashCode("string"), -891985903);
    assert.equals(hashCode(123456789), 123456789);
    assert.equals(hashCode({}), 1);
    assert.equals(hashCode([]), 2);
    assert.equals(hashCode(true), 1);
    assert.equals(hashCode(false), 0);
    assert.equals(hashCode(null), 0);
    assert.equals(hashCode(undefined), 0);
    assert.end();
});
