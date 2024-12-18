import React from "react";

import AddPartner from "../../components/partners/addPartner/AddPartner";
import UpdatePartner from "../../components/partners/updatePartner/UpdatePartner";

export default function Partners() {
  return (
    <div>
      <h1 style={{ color: "red" }}>Partners</h1>

      <AddPartner />

      <UpdatePartner />
    </div>
  );
}
