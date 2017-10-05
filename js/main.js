var app = new Vue({
  el: "#app",
  data: {
    skills: [
      { text: "Scratch ur bum" }
    ],
    new_skill: "Add a new skill",
    current_source: null
  },
  methods: {
    addSkill: function () {
      this.skills.push({text: this.new_skill})
    },
    focusSkill: function (skill_id) {
      if (this.current_source === null) {
        this.current_source = skill_id;
      } else {
        console.log("creating an edge between " + this.current_source + ", " + skill_id);
        this.current_source = null;
      }
    },
    clearSelection: function () {
      this.current_source = null;
    }
  }
})
