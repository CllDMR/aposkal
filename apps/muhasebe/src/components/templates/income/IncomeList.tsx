import Layout from "./Layout";

import ListHeader from "~/components/organisms/income/ListHeader";

const IncomeList = () => {
  return (
    <div>
        <Layout
        header={<ListHeader />}
        pagination={<div>pagination</div>}
        >
            <div>children</div>
        </Layout>
    </div>
  )
}

export default IncomeList