import { ICommonFormProps } from "@erxes/ui-settings/src/common/types";
import { EmptyState } from "@erxes/ui/src";
import { Alert, confirm } from "@erxes/ui/src/utils";
import { withProps } from "@erxes/ui/src/utils/core";
import { gql } from "@apollo/client";
import * as compose from "lodash.flowright";
import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { ICommonListProps } from "../../common/types";
import {
  RiskIndicatorsListQueryResponse,
  RiskIndicatorsTotalCountQueryResponse,
} from "../common/types";
import { generateParams } from "../common/utils";
import List from "../components/List";
import { mutations, queries } from "../graphql";

type Props = {
  queryParams: any;
};

type FinalProps = {
  listQuery: RiskIndicatorsListQueryResponse;
  totalCountQuery: RiskIndicatorsTotalCountQueryResponse;
  removeMutation: any;
  duplicateMutation: any;
} & Props &
  ICommonListProps &
  ICommonFormProps;
class ListContainer extends React.Component<FinalProps> {
  render() {
    const { removeMutation, duplicateMutation, listQuery, totalCountQuery } =
      this.props;

    const { riskIndicators, loading, error } = listQuery;

    if (error) {
      return <EmptyState icon="info-circle" text={error} />;
    }

    const remove = (_ids: string[]) => {
      confirm("Are you sure?").then(() => {
        removeMutation({ variables: { _ids } })
          .then(() => {
            listQuery.refetch();
            Alert.success("You successfully removed risk assesments");
          })
          .catch((e) => {
            Alert.error(e.message);
          });
      });
    };

    const duplicate = (_id) => {
      confirm().then(() => {
        duplicateMutation({ variables: { _id } })
          .then(() => {
            listQuery.refetch();
          })
          .catch((e) => {
            Alert.error(e.message);
          });
      });
    };

    const updatedProps = {
      ...this.props,
      list: riskIndicators,
      totalCount: totalCountQuery?.riskIndicatorsTotalCount || 0,
      refetch: listQuery.refetch,
      loading,
      remove,
      duplicate,
    };

    return <List {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props>(gql(queries.list), {
      name: "listQuery",
      options: ({ queryParams }) => ({
        variables: generateParams({ queryParams }),
      }),
    }),
    graphql<Props>(gql(queries.totalCount), {
      name: "totalCountQuery",
      options: ({ queryParams }) => ({
        variables: generateParams({ queryParams }),
      }),
    }),
    graphql(gql(mutations.riskIndicatorAdd), {
      name: "addMutation",
    }),
    graphql(gql(mutations.riskIndicatorRemove), {
      name: "removeMutation",
    }),
    graphql(gql(mutations.riskIndicatorUpdate), {
      name: "editMutation",
    }),
    graphql(gql(mutations.duplicate), {
      name: "duplicateMutation",
    })
  )(ListContainer)
);
