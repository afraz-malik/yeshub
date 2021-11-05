import * as React from "react";
import { MAIN_WEBSITE } from "../../config/config";
import { Button } from "reactstrap";

const ReportedEvent = (event) => (
  <React.Fragment>
    <td>{event?.event?.eventName}</td>
    <td>
      {event?.event?.author ? event?.event?.author?.userName : "USER Removed"}
    </td>
    <td>Event</td>
  </React.Fragment>
);

const ReportedPost = (post) => (
  <React.Fragment>
    <td>{post?.post?.title || "Post Removed"}</td>
    <td>{post?.post?.author ? post?.post?.author?.userName : ""}</td>
    <td>Post</td>
  </React.Fragment>
);

const ReportedComment = (comment) => (
  <React.Fragment>
    <td>{comment?.comment?.body}</td>
    <td>
      {comment?.comment?.userId ? comment?.comment?.userId?.userName : ""}
    </td>
    <td>Comment</td>
  </React.Fragment>
);

const Headers = {
  comment: ReportedComment,
  post: ReportedPost,
  event: ReportedEvent,
};

/**
 *
 * @param {*} report
 * @returns { comment | post | event }
 */
const ReportType = (report) => {
  if (report.comment) return "comment";
  else if (report.post) return "post";
  else if (report.event) return "event";

  return "";
};

const ReportedItem = ({ report, index, onDeleteReport, onDeleteItem }) => {
  const type = ReportType(report);
  if (type.length === 0) return null;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{report.reason}</td>
      {React.createElement(Headers[type], { [type]: report[type] })}
      <td>{report.reportedBy?.userName}</td>
      <td className="text-right">
        <a
          href={`${MAIN_WEBSITE}${
            type === "event"
              ? `event/details/${report?.event?._id}`
              : `post/details/${report[type]?._id}`
          }`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-primary mr-1"
        >
          Visit Page
        </a>

        <Button
          onClick={() => onDeleteItem(report._id, report[type]._id, type)}
          color="danger"
          size="sm"
          className="mr-1"
        >
          Delete {type}
        </Button>

        <Button
          onClick={() => onDeleteReport(report._id)}
          color="danger"
          size="sm"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ReportedItem;
